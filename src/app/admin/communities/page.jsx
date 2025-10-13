"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, Plus, Building2 } from "lucide-react";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState(null);
  const [community, setCommunity] = useState({
    name: "",
    plans: { twoweekclassic: "", twoweekdeep: "", fourweekclassic: "", fourweekdeep: "" },
  });
  const [searchCommunity, setSearchCommunity] = useState("");

  const fetchCommunities = async () => {
    try {
      const response = await axios.get('/api/community')
      setCommunities(response.data.communities)
    } catch (error) {
      console.log("error while fetching communities");
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

        <input
          type="text"
          placeholder="Search communities..."
          value={searchCommunity}
          onChange={(e) => setSearchCommunity(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
        />

        {filteredCommunities.length > 0 ? (
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
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
        )}
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
