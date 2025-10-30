"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, Plus } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [editingCommunity, setEditingCommunity] = useState(null);
  const [community, setCommunity] = useState({
    name: "",
    plans: { twoweekclassic: "", twoweekdeep: "", fourweekclassic: "", fourweekdeep: "" },
  });
  const [searchCommunity, setSearchCommunity] = useState("");

  const fetchCommunities = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/community')
      setCommunities(response.data.communities)
    } catch (error) {
      console.log("error while fetching communities");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunities()
  }, []);

  const handleCommunityChange = (e) => {
    const { name, value } = e.target;
    if (name in community.plans) {
      setCommunity((prev) => ({
        ...prev,
        plans: { ...prev.plans, [name]: value },
      }));
    } else {
      setCommunity((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCommunitySubmit = async (e) => {
    e.preventDefault();
    if (editingCommunity) {
      await axios.patch(`/api/community/${editingCommunity._id}`, community)
    } else {
      await axios.post("/api/community", community);
    }
    await fetchCommunities()
    setShowModal(false);
  };

  const handleCommunityEdit = (c) => {
    setEditingCommunity(c);
    setCommunity({
      name: c.name,
      plans: {
        twoweekclassic: c.plans?.twoweekclassic || "",
        twoweekdeep: c.plans?.twoweekdeep || "",
        fourweekclassic: c.plans?.fourweekclassic || "",
        fourweekdeep: c.plans?.fourweekdeep || "",
      },
    }); setShowModal(true);
  };

  const handleCommunityDelete = async (id) => {
    if (confirm("Are you sure you want to delete this community?")) {
      await axios.delete(`/api/community/${id}`)
      await fetchCommunities()
    }
  };

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(searchCommunity.toLowerCase())
  );


  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("List of Communities Sheet", 14, 15);

    const generatedText = `Generated on: ${new Date().toLocaleDateString()}`;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(generatedText);
    doc.setFontSize(11);
    doc.text(generatedText, pageWidth - textWidth - 14, 15);

    const headers = [
      ["S.No", "Community Name", "2 Week Classic", "2 Week Deep", "4 Week Classic", "4 Week Deep"],
    ];

    const rows = filteredCommunities.map((c, i) => [
      i + 1,
      c.name,
      c.plans.twoweekclassic,
      c.plans.twoweekdeep,
      c.plans.fourweekclassic,
      c.plans.fourweekdeep,
    ]);

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: rows,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3, halign: "center" },
    });

    doc.save(`communities_sheet_${new Date().toLocaleDateString()}.pdf`);
  };


  const exportToExcel = () => {
    const headers = [
      ["S.No", "Community Name", "2 Week Classic", "2 Week Deep", "4 Week Classic", "4 Week Deep"],
    ];

    const rows = filteredCommunities.map((c, i) => [
      i + 1,
      c.name,
      c.plans.twoweekclassic,
      c.plans.twoweekdeep,
      c.plans.fourweekclassic,
      c.plans.fourweekdeep,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Communities Sheet");

    // Optional: column widths
    ws['!cols'] = [
      { wch: 5 },  
      { wch: 20 }, 
      { wch: 15 }, 
      { wch: 20 }, 
      { wch: 15 }, 
      { wch: 10 }, 
    ];

    XLSX.writeFile(wb, `communities_sheet.xlsx`);
  };


  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
            Communities
          </h2>
          <button
            onClick={() => {
              setEditingCommunity(null);
              setCommunity({
                name: "",
                plans: { twoweekclassic: "", twoweekdeep: "", fourweekclassic: "", fourweekdeep: "" },
              });
              setShowModal(true);
            }}
            className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-500 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Community
          </button>
        </div>

          <div className="flex items-center justify-between my-10">
            <input
          type="text"
          placeholder="Search communities..."
          value={searchCommunity}
          onChange={(e) => setSearchCommunity(e.target.value)}
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
        
        {loading ? <div className="max-w-7xl flex items-start justify-center min-h-screen">
          <div className="flex flex-row gap-2 mt-10">
            <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div> :
          filteredCommunities.length > 0 ? (
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden mt-5">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 text-left">Community Name</th>
                  <th className="p-2 text-left">2 Week Classic</th>
                  <th className="p-2 text-left">2 Week Deep</th>
                  <th className="p-2 text-left">4 Week Classic</th>
                  <th className="p-2 text-left">4 Week Deep</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommunities.map((c, idx) => (
                  <tr key={c._id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">Rs.{c.plans?.twoweekclassic || "NA"}</td>
                    <td className="p-2">Rs.{c.plans?.twoweekdeep || "NA"}</td>
                    <td className="p-2">Rs.{c.plans?.fourweekclassic || "NA"}</td>
                    <td className="p-2">Rs.{c.plans?.fourweekdeep || "NA"}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleCommunityEdit(c)}
                        className="text-white p-2 rounded-md bg-[#6e8cfb]"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleCommunityDelete(c._id)}
                        className="text-white p-2 rounded-md bg-[#e11c48]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-sm">No communities found.</p>
          )
        }
      </div>


      {/* Community Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-4xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingCommunity ? "Edit Community" : "Add Community"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500">
                ✖
              </button>
            </div>

            <form onSubmit={handleCommunitySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Community Name</label>
                <input
                  type="text"
                  name="name"
                  value={community.name}
                  onChange={handleCommunityChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>

              <h3 className="text-md font-semibold mt-4">Plans</h3>
              <div className="grid grid-cols-2 gap-4">
                {["twoweekclassic", "twoweekdeep", "fourweekclassic", "fourweekdeep"].map((plan) => (
                  <div key={plan}>
                    <label className="block text-sm font-medium">
                      {plan.replace(/(\d+)(week)(.*)/, "$1 Week $3")}
                    </label>
                    <input
                      type="number"
                      name={plan}
                      value={community.plans[plan]}
                      onChange={handleCommunityChange}
                      className="w-full border rounded-md p-2"
                      required
                      min="0"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="bg-[#6e8cfb] text-white px-4 py-2 rounded-md w-full hover:bg-gray-500"
              >
                {editingCommunity ? "Update Community" : "Create Community"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
