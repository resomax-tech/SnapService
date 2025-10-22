"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { toDateKey } from "@/lib/normalizeDate";
import { UserRoundCog } from "lucide-react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import * as XLSX from "xlsx";


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

            const response = await axios.get(`/api/generate`, { params, withCredentials: true })
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


    const exportToExcel = () => {
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
            j.done,      // visually represent checkboxes
            j.pending
        ]);

        const ws = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Worker Job Sheet");

        // Optional: column widths
        ws['!cols'] = [
            { wch: 5 },  // S.No
            { wch: 20 }, // Customer
            { wch: 15 }, // Mobile
            { wch: 20 }, // Community
            { wch: 15 }, // Flat
            { wch: 10 }, // Bathrooms
            { wch: 12 }, // Plan
            { wch: 12 }, // Status
            { wch: 10 }, // Done
            { wch: 10 }, // Pending
        ];

        XLSX.writeFile(wb, `${findWorkerName(selectedWorker)}_Worker_Jobsheet.xlsx`);
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
