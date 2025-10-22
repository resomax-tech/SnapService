"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";


export default function WorkersPage() {
  const [workers, setWorkers] = useState([]);
  const [communities, setCommunities] = useState([]); // Needed to map communities names
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [loading, setLoading] = useState(false)
  const [worker, setWorker] = useState({
    name: "",
    mobile: "",
    communities: [],
    workType: "classic",
    maxBathrooms: 7,
  });
  const [searchWorker, setSearchWorker] = useState("");

  const fetchCommunities = async () => {
    try {
      const response = await axios.get('/api/community')
      setCommunities(response.data.communities)
    } catch (error) {
      console.log("error while fetching communities");
      console.log(error);
    }
  }

  const fetchWorkers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/worker')
      setWorkers(response.data.workers || []);
    } catch (error) {
      console.log("error while fetching communities");
      setWorkers([]);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunities()
    fetchWorkers()
  }, []);

  /** Worker Handlers */
  const handleWorkerChange = (e) => {
    const { name, value } = e.target;
    setWorker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommunityChange = (index, value) => {
    setWorker((prev) => {
      const updated = [...(prev.communities || [])];
      updated[index] = value;
      return { ...prev, communities: updated };
    });
  };

  const handleWorkerSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...worker,
      communities: (worker.communities || []).filter(
        (c) => c && c.trim() !== ""
      ),
    };

    try {
      if (editingWorker) {
        await axios.patch(`/api/worker/${editingWorker._id}`, payload);
      } else {
        await axios.post(`/api/worker`, payload);
      }

      await fetchWorkers();
      setEditingWorker(null);
      setShowWorkerModal(false);
    } catch (error) {
      console.error("Error saving worker:", error);
    }
  };

  const handleWorkerEdit = (w) => {
    setEditingWorker(w);
    setWorker({
      name: w.name,
      mobile: w?.mobile || "",
      communities: Array.isArray(w.communities)
        ? w.communities
        : w.communities
          ? [w.communities]
          : [],
      workType: w?.workType || "classic",
      maxBathrooms: w?.maxBathrooms || 5,
    });
    setShowWorkerModal(true);
  };

  const handleWorkerDelete = async (w) => {
    if (confirm("Are you sure you want to delete this worker?")) {
      await axios.delete(`/api/worker/${w._id}`)
      fetchWorkers()
    }
  };

  const filteredWorkers = workers.filter(
    (w) =>
      w.name.toLowerCase().includes(searchWorker.toLowerCase()) ||
      w.mobile.includes(searchWorker)
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("List of Workers Sheet", 14, 15);

    const generatedText = `Generated on: ${new Date().toLocaleDateString()}`;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(generatedText);
    doc.setFontSize(11);
    doc.text(generatedText, pageWidth - textWidth - 14, 15);

    const headers = [
      ["S.No", "Name", "Mobile", "Community A", "Community B", "Work Type", "Max Jobs"],
    ];

    const rows = filteredWorkers.map((w, i) => [
      i + 1,
      w.name,
      w.mobile,
      getCommunityName(w.communities[0]),
      getCommunityName(w.communities[1]),
      w.workType,
      w.maxBathrooms,
    ]);

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: rows,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3, halign: "center" },
    });

    doc.save(`Workers_sheet_${new Date().toLocaleDateString()}.pdf`);
  };


  const exportToExcel = () => {
    const headers = [
      ["S.No", "Name", "Mobile", "Community A", "Community B", "Work Type", "Max Jobs"],
    ];

    const rows = filteredWorkers.map((w, i) => [
      i + 1,
      w.name,
      w.mobile,
      getCommunityName(w.communities[0]),
      getCommunityName(w.communities[1]),
      w.workType,
      w.maxBathrooms,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Workers Sheet");

    // Optional: column widths
    ws['!cols'] = [
      { wch: 5 },  
      { wch: 20 },  
      { wch: 15 },  
      { wch: 20 },  
      { wch: 15 },  
      { wch: 10 },  
    ];

    XLSX.writeFile(wb, `Workers_sheet.xlsx`);
  };

  const getCommunityName = (id) => communities.find((c) => c._id === id)?.name || "";

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
            Workers
          </h2>
          <button
            onClick={() => {
              setEditingWorker(null);
              setWorker({ name: "", mobile: "", communities: [], workType: "classic", maxBathrooms: 5 });
              setShowWorkerModal(true);
            }}
            className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-500 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Worker
          </button>
        </div>

        <div className="flex items-center justify-between my-10">
          <input
            type="text"
            placeholder="Search workers..."
            value={searchWorker}
            onChange={(e) => setSearchWorker(e.target.value)}
            className="w-[60%] border rounded-md p-2"
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
        ) : workers.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-10">No workers found.</p>
        ) : (
          // ✅ Show data table
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 text-left">S.No</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">Community A</th>
                <th className="p-2 text-left">Community B</th>
                <th className="p-2 text-left">Work Type</th>
                <th className="p-2 text-left">Max Jobs</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((w, idx) => (
                <tr key={w._id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{w.name}</td>
                  <td className="p-2">{w.mobile}</td>
                  <td className="p-2">{getCommunityName(w.communities[0]) || "-"}</td>
                  <td className="p-2">{getCommunityName(w.communities[1]) || "-"}</td>
                  <td className="p-2 capitalize">{w.workType}</td>
                  <td className="p-2">{w.maxBathrooms}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleWorkerEdit(w)}
                      className="text-white bg-[#6e8cfb] p-2 rounded-md"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleWorkerDelete(w)}
                      className="text-white bg-[#e11c48] p-2 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

      {/* Worker Modal */}
      {showWorkerModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-4xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingWorker ? "Edit Worker" : "Add Worker"}
              </h2>
              <button onClick={() => setShowWorkerModal(false)} className="text-gray-500">
                ✖
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleWorkerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name (full width) */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={worker.name}
                  onChange={handleWorkerChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Enter worker name"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={worker.mobile}
                  onChange={handleWorkerChange}
                  className="w-full  rounded-md p-2"
                  placeholder="Enter 10-digit mobile"
                  required
                  pattern="\d{10}"
                />
              </div>

              {/* communities */}
              {/* Communities A & B side by side */}
              <div>

                <label className="block text-sm font-medium">community A</label>
                <select
                  value={worker.communities[0] || ""}
                  onChange={(e) => handleCommunityChange(0, e.target.value)}
                  className="w-full rounded-md p-2"
                  required
                >
                  <option value="">Select community</option>
                  {communities.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* communities B */}
              <div>
                <label className="block text-sm font-medium">community B</label>
                <select
                  value={worker.communities[1] || ""}
                  onChange={(e) => handleCommunityChange(1, e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select community</option>
                  {communities.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>


              {/* Work Type */}
              <div>
                <label className="block text-sm font-medium">Work Type</label>
                <select
                  name="workType"
                  value={worker.workType}
                  onChange={handleWorkerChange}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="classic">Classic</option>
                  <option value="deep">Deep</option>
                </select>
              </div>

              {/* Max Jobs */}
              <div>
                <label className="block text-sm font-medium">Max Jobs</label>
                <input
                  type="number"
                  name="maxBathrooms"
                  value={worker.maxBathrooms}
                  onChange={handleWorkerChange}
                  className="w-full border rounded-md p-2"
                  min={0}
                  max={7}
                  required
                />
              </div>

              {/* Empty placeholder to balance grid if needed */}
              <div></div>

              {/* Submit Button spans full width */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-[#6e8cfb] text-white px-4 py-2 rounded-md w-full hover:bg-gray-500"
                >
                  {editingWorker ? "Update Worker" : "Create Worker"}
                </button>
              </div>
            </form>
          </div>
        </div >

      )
      }
    </main >
  );
}

