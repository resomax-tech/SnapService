"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { toDateKey } from "@/lib/normalizeDate";
import { UserRoundCog } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";


export default function CommunitiesPage() {
    const [workers, setWorkers] = useState([])
    const [sheetData, setSheetData] = useState([])
    const [selectedWorker, setSelectedWorker] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [selected, setSelected] = useState(null);

    const fetchWorkers = async () => {
        try {
            const response = await axios.get('/api/worker', { withCredentials: true })
            console.log(response.data.workers);

            setWorkers(response.data.workers)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleGenerate = async () => {
        try {
            setLoading(true)
            const params = {
                worker: selectedWorker,
                date: toDateKey(selected)
            }

            const response = await axios.get(`/api/auth/admin/generate`, { params, withCredentials: true })
            setSheetData(response.data.formatted)

        } catch (error) {
            console.log("error: ", error.message);
        } finally {
            setLoading(false)
        }
    }


    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        doc.setFontSize(16);
        doc.text("Workers Job Sheet", 14, 15);

        const generatedText = `Generated on: ${new Date().toLocaleDateString()}`;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(generatedText);
        doc.setFontSize(11);
        doc.text(generatedText, pageWidth - textWidth - 14, 15);

        const headers = [
            ["S.No", "Customer", "Mobile", "Community", "Flat", "Bathrooms", "Plan", "Status", "Done", "Pending"],
        ];

        const rows = sheetData.map((j, i) => [
            i + 1,
            j.customer,
            j.mobile,
            j.community,
            j.flat,
            j.bathrooms,
            j.workType,
            j.status,
            "", // checkbox
            "", // checkbox
        ]);

        autoTable(doc, {
            startY: 25,
            head: headers,
            body: rows,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 3, halign: "center" },
            didDrawCell: function (data) {
                if (data.section === "body" && (data.column.index === 8 || data.column.index === 9)) {
                    const { x, y, width, height } = data.cell;
                    const boxSize = 4; // checkbox size

                    // Center horizontally and vertically inside cell
                    const offsetX = x + (width - boxSize) / 2;
                    const offsetY = y + (height - boxSize) / 2;

                    doc.rect(offsetX, offsetY, boxSize, boxSize);
                }
            },
        });

        doc.save(`${findWorkerName(selectedWorker)}_Worker_Jobsheet_${new Date().toLocaleDateString()}.pdf`);
    };



    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Worker Job Sheet");

        // Header row
        worksheet.addRow([
            "S.No",
            "Customer",
            "Mobile",
            "Community",
            "Flat",
            "Bathrooms",
            "Plan",
            "Status",
            "Done",
            "Pending",
        ]);

        // Data rows
        sheetData.forEach((j, i) => {
            worksheet.addRow([
                i + 1,
                j.customer,
                j.mobile,
                j.community,
                j.flat,
                j.bathrooms,
                j.workType,
                j.status,
                j.done ? "✔️" : "",     // show checkmark if done
                j.pending ? "✔️" : "",  // same for pending
            ]);
        });

        // Style header row
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
        headerRow.alignment = { horizontal: "center", vertical: "middle" };
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF2F5597" }, // dark blue header
            };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

        // Column widths
        worksheet.columns = [
            { width: 5 },  // S.No
            { width: 20 }, // Customer
            { width: 15 }, // Mobile
            { width: 20 }, // Community
            { width: 15 }, // Flat
            { width: 10 }, // Bathrooms
            { width: 12 }, // Plan
            { width: 12 }, // Status
            { width: 10 }, // Done
            { width: 10 }, // Pending
        ];

        // Center-align all rows
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {
                cell.alignment = { horizontal: "center", vertical: "middle" };
            });
        });

        // Optional: alternating row background colors for readability
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1 && rowNumber % 2 === 0) {
                row.eachCell((cell) => {
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFF2F2F2" }, // light gray for alternate rows
                    };
                });
            }
        });

        // Generate Excel file and download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${findWorkerName(selectedWorker)}_Worker_Jobsheet.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    };



    const findWorkerName = (id) => {
        const worker = workers.find(w => w._id == id)
        return worker.name
    }

    useEffect(() => {
        fetchWorkers()
    }, [])


    return (
        <main className="flex-1 p-6 overflow-y-auto">
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                        Generate Jobs for Workers
                    </h2>
                </div>

                <div className="flex justify-between items-center gap-10">
                    <div className="flex gap-5">
                        <select
                            defaultValue={""}
                            className="w-sm rounded-md p-2"
                            required
                            onChange={(e) => setSelectedWorker(e.target.value)}
                        >
                            <option value="">Select Worker</option>
                            {workers.map((w) => (
                                <option key={w._id} value={w._id}>
                                    {w.name}
                                </option>
                            ))}
                        </select>

                        <button
                            className="border border-[#E2E2E2] rounded-md py-2 px-4"
                            onClick={() => setShowPicker(!showPicker)}
                        >
                            {selected ? selected.toLocaleDateString() : "Select Date"}
                        </button>

                        {showPicker && (
                            <div className="absolute  left-2/4 -translate-x-1/2 top-48 z-10 mt-2 bg-white p-4 rounded-lg shadow-lg">
                                <DayPicker
                                    mode="single"
                                    selected={selected}

                                    onSelect={(date) => {
                                        setSelected(date);
                                        setShowPicker(false);
                                    }}
                                    footer={
                                        selected
                                            ? `Selected: ${selected.toLocaleDateString()}`
                                            : "Pick a day."
                                    }
                                />
                            </div>
                        )}
                        <button
                            className="bg-gray-700 text-white w-32 p-2 px-3 rounded-md hover:bg-gray-500 flex justify-center items-center gap-2"
                            onClick={handleGenerate}
                            disabled={loading || !selectedWorker || !selected}
                        >
                            <UserRoundCog size={28} />
                            {loading ? "Generating..." : "Generate"}
                        </button></div>

                </div>
                <div className="flex items-center justify-end">
                    <div className="flex items-center justify-end gap-4 border mt-8 border-[#e2e2e2] rounded-md px-2">
                        <p className="font-medium text-lg">Download:</p>
                        <div className="flex space-x-4  p-2 ">
                            <img src="/icons/pdf.svg" className="h-8 transition-all duration-300 cursor-pointer hover:scale-110" onClick={handleDownloadPDF} />
                            <img src="/icons/excel.svg" className="h-8 transition-all duration-300 cursor-pointer hover:scale-110" onClick={exportToExcel} />
                        </div>
                    </div>
                </div>

                {/* <div className="mt-10">No Data Found</div> */}

                {loading ? <div className="max-w-7xl flex items-start justify-center min-h-screen">
                    <div className="flex flex-row gap-2 mt-20">
                        <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                </div> :
                    <div className="mt-8">
                        {sheetData.length > 0 ? (
                            <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="p-2 text-left">S.No</th>
                                        <th className="p-2 text-left">Customer</th>
                                        <th className="p-2 text-left">Mobile</th>
                                        <th className="p-2 text-left">community</th>
                                        <th className="p-2 text-left">Flat</th>
                                        <th className="p-2 text-left">Bathrooms</th>
                                        <th className="p-2 text-left">Plan</th>
                                        <th className="p-2 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sheetData.map((j, idx) => (
                                        <tr key={j.id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                                            <td className="p-2">{idx + 1}</td>
                                            <td className="p-2">{j.customer}</td>
                                            <td className="p-2">{j.mobile}</td>
                                            <td className="p-2">{j.community || "-"}</td>
                                            <td className="p-2">{j.flat}</td>
                                            <td className="p-2">{j.bathrooms}</td>
                                            <td className="p-2 capitalize">{j.workType}</td>
                                            <td className="p-2">{j.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500 text-sm">No jobs found.</p>
                        )}
                    </div>
                }

            </div>
        </main>
    );
}
