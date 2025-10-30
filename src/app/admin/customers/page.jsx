"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Users } from "lucide-react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [loading, setLoading] = useState(false)

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    mobile: "",
    communityId: "",
    flat: "",
  });

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/auth/admin/customer', { withCredentials: true })
      setCustomers(response.data.users)
      setLoading(false)
    } catch (error) {
      console.log("error: ", error.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const [searchCustomer, setSearchCustomer] = useState("");

  /** Customer Handlers */
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === editingCustomer.id ? { ...editingCustomer, ...customer } : c))
      );
    } else {
      setCustomers((prev) => [...prev, { id: Date.now(), ...customer }]);
    }
    setCustomer({ name: "", email: "", mobile: "", communityId: "", flat: "" });
    setEditingCustomer(null);
    setShowCustomerModal(false);
  };

  const handleCustomerEdit = (c) => {
    setEditingCustomer(c);
    setCustomer(c);
    setShowCustomerModal(true);
  };

  const handleCustomerDelete = (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
      c.email.toLowerCase().includes(searchCustomer.toLowerCase()) ||
      c.mobile.includes(searchCustomer)
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("List of Customers", 14, 15);

    const generatedText = `Generated on: ${new Date().toLocaleDateString()}`;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(generatedText);
    doc.setFontSize(11);
    doc.text(generatedText, pageWidth - textWidth - 14, 15);

    const headers = [
      ["S.No", "Name", "Email", "Mobile",],
    ];

    const rows = filteredCustomers.map((c, i) => [
      i + 1,
      c.name,
      c.email,
      c.mobile,
    ]);

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: rows,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3, halign: "center" },
    });

    doc.save(`Customers_sheet_${new Date().toLocaleDateString()}.pdf`);
  };



  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Customers Sheet");

    // Add header row
    worksheet.addRow(["S.No", "Name", "Email", "Mobile"]);

    // Add data rows
    filteredCustomers.forEach((c, i) => {
      worksheet.addRow([i + 1, c.name, c.email, c.mobile]);
    });

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: "center" };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9EAD3" }, // light green background
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Optional: Set column widths
    worksheet.columns = [
      { width: 5 },   // S.No
      { width: 20 },  // Name
      { width: 25 },  // Email
      { width: 15 },  // Mobile
    ];

    // Create Excel file as buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Download in browser
    const blob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Customers_sheet.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // const getCommunityName = (id) => communities.find((c) => c.id === Number(id))?.name || "";

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
            Customers
          </h2>
          <button
            onClick={() => {
              setEditingCustomer(null);
              setCustomer({ name: "", email: "", mobile: "", communityId: "", flat: "" });
              setShowCustomerModal(true);
            }}
            className="bg-gray-700 hidden text-white p-2 rounded-md hover:bg-gray-500 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Customer
          </button>
        </div>

        <div className="flex items-center justify-between my-10">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
            className="w-[60%] border rounded-md p-3"
          />

          <div className="flex items-center justify-end">
            <div className="flex items-center justify-end gap-4 border border-[#e2e2e2] rounded-md px-2">
              <p className="font-medium text-lg">Download:</p>
              <div className="flex space-x-4  p-2 ">
                <img src="/icons/pdf.svg" className="h-8 transition-all duration-300 cursor-pointer hover:scale-110" onClick={handleDownloadPDF} />
                <img src="/icons/excel.svg" className="h-8 transition-all duration-300 cursor-pointer hover:scale-110" onClick={exportToExcel} />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="max-w-7xl flex items-start justify-center min-h-[200px]">
            <div className="flex flex-row gap-2 mt-10">
              <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        ) : customers.length === 0 ? (
          <p className="text-gray-500 text-sm">No customers found.</p>
        ) : (<table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left">S.No</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Mobile</th>
              {/* <th className="p-2 text-left">Community</th>
                <th className="p-2 text-left">Flat</th> */}
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c, idx) => (
              <tr key={c._id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.mobile}</td>
                {/* <td className="p-2">{getCommunityName(c.communityId)}</td>
                  <td className="p-2">{c.flat}</td> */}
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleCustomerEdit(c)}
                    className="text-white bg-[#6e8cfb] p-2 rounded-md"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleCustomerDelete(c.id)}
                    className="text-white bg-[#e11c48] p-2 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )
        }
      </div>

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-4xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingCustomer ? "Edit Customer" : "Add Customer"}
              </h2>
              <button onClick={() => setShowCustomerModal(false)} className="text-gray-500">
                ✖
              </button>
            </div>

            <form onSubmit={handleCustomerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">

                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleCustomerChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Enter customer email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={customer.mobile}
                  onChange={handleCustomerChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Enter 10-digit mobile"
                  required
                  pattern="\d{10}"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Community</label>
                <select
                  name="communityId"
                  value={customer.communityId}
                  onChange={handleCustomerChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:border-gray-400"

                  required
                >
                  <option value="" >Select community</option>
                  {communities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Flat</label>
                <input
                  type="text"
                  name="flat"
                  value={customer.flat}
                  onChange={handleCustomerChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Enter flat number (e.g., A-101)"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-[#6e8cfb] text-white px-4 py-2 rounded-md  hover:bg-gray-500 w-full"
                >
                  {editingCustomer ? "Update Customer" : "Create Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
