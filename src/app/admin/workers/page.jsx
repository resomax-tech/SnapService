"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, UserCog } from "lucide-react";

export default function WorkersPage() {
  const [workers, setWorkers] = useState([]);
  const [communities, setCommunities] = useState([]); // Needed to map community names
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [worker, setWorker] = useState({
    name: "",
    mobile: "",
    communityId: "",
    workType: "classic",
    maxJobs: 5,
  });
  const [searchWorker, setSearchWorker] = useState("");

  /** Mock Data Load */
  useEffect(() => {
    setCommunities([
      { id: 1, name: "Green Valley" },
      { id: 2, name: "Blue Hills" },
    ]);

    setWorkers([
      {
        id: 1,
        name: "John Doe",
        mobile: "9876543210",
        communityId: 1,
        workType: "classic",
        maxJobs: 5,
      },
      {
        id: 2,
        name: "Jane Smith",
        mobile: "9123456780",
        communityId: 2,
        workType: "deep",
        maxJobs: 7,
      },
    ]);
  }, []);

  /** Worker Handlers */
  const handleWorkerChange = (e) => {
    const { name, value } = e.target;
    setWorker((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkerSubmit = (e) => {
    e.preventDefault();
    if (editingWorker) {
      setWorkers((prev) =>
        prev.map((w) => (w.id === editingWorker.id ? { ...editingWorker, ...worker } : w))
      );
    } else {
      setWorkers((prev) => [...prev, { id: Date.now(), ...worker }]);
    }
    setWorker({ name: "", mobile: "", communityId: "", workType: "classic", maxJobs: 5 });
    setEditingWorker(null);
    setShowWorkerModal(false);
  };

  const handleWorkerEdit = (w) => {
    setEditingWorker(w);
    setWorker(w);
    setShowWorkerModal(true);
  };

  const handleWorkerDelete = (id) => {
    if (confirm("Are you sure you want to delete this worker?")) {
      setWorkers((prev) => prev.filter((w) => w.id !== id));
    }
  };

  const filteredWorkers = workers.filter(
    (w) =>
      w.name.toLowerCase().includes(searchWorker.toLowerCase()) ||
      w.mobile.includes(searchWorker)
  );

  const getCommunityName = (id) => communities.find((c) => c.id === Number(id))?.name || "";

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <UserCog size={18} />
            Workers
          </h2>
          <button
            onClick={() => {
              setEditingWorker(null);
              setWorker({ name: "", mobile: "", communityId: "", workType: "classic", maxJobs: 5 });
              setShowWorkerModal(true);
            }}
            className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-500 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Worker
          </button>
        </div>

        <input
          type="text"
          placeholder="Search workers..."
          value={searchWorker}
          onChange={(e) => setSearchWorker(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
        />

        {filteredWorkers.length > 0 ? (
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">Community</th>
                <th className="p-2 text-left">Work Type</th>
                <th className="p-2 text-left">Max Jobs</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((w, idx) => (
                <tr key={w.id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="p-2">{w.name}</td>
                  <td className="p-2">{w.mobile}</td>
                  <td className="p-2">{getCommunityName(w.communityId)}</td>
                  <td className="p-2 capitalize">{w.workType}</td>
                  <td className="p-2">{w.maxJobs}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleWorkerEdit(w)}
                      className="text-white bg-[#6e8cfb] p-2 rounded-md"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleWorkerDelete(w.id)}
                      className="text-white bg-[#e11c48] p-2 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-sm">No workers found.</p>
        )}
      </div>

      {/* Worker Modal */}
      {showWorkerModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-4xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingWorker ? "Edit Worker" : "Add Worker"}
              </h2>
              <button onClick={() => setShowWorkerModal(false)} className="text-gray-500">
                ✖
              </button>
            </div>

            <form onSubmit={handleWorkerSubmit} className="space-y-4">
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

              <div>
                <label className="block text-sm font-medium">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={worker.mobile}
                  onChange={handleWorkerChange}
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
                  value={worker.communityId}
                  onChange={handleWorkerChange}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select community</option>
                  {communities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

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

              <div>
                <label className="block text-sm font-medium">Max Jobs</label>
                <input
                  type="number"
                  name="maxJobs"
                  value={worker.maxJobs}
                  onChange={handleWorkerChange}
                  className="w-full border rounded-md p-2"
                  min={0}
                  max={7}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#6e8cfb] text-white px-4 py-2 rounded-md w-full hover:bg-gray-500"
              >
                {editingWorker ? "Update Worker" : "Create Worker"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
