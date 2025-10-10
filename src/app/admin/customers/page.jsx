"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Users } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    mobile: "",
    communityId: "",
    flat: "",
  });
  const [searchCustomer, setSearchCustomer] = useState("");

  /** Mock Data Load */
  useEffect(() => {
    setCommunities([
      { id: 1, name: "Green Valley" },
      { id: 2, name: "Blue Hills" },
    ]);

    setCustomers([
      {
        id: 1,
        name: "Amit Kumar",
        email: "amit@example.com",
        mobile: "9876543210",
        communityId: 1,
        flat: "B-203",
      },
      {
        id: 2,
        name: "Priya Sharma",
        email: "priya@example.com",
        mobile: "9123456780",
        communityId: 2,
        flat: "A-105",
      },
    ]);
  }, []);

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

  const getCommunityName = (id) => communities.find((c) => c.id === Number(id))?.name || "";

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users size={18} />
            Customers
          </h2>
          <button
            onClick={() => {
              setEditingCustomer(null);
              setCustomer({ name: "", email: "", mobile: "", communityId: "", flat: "" });
              setShowCustomerModal(true);
            }}
            className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-500 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Customer
          </button>
        </div>

        <input
          type="text"
          placeholder="Search customers..."
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
        />

        {filteredCustomers.length > 0 ? (
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">Community</th>
                <th className="p-2 text-left">Flat</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((c, idx) => (
                <tr key={c.id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.mobile}</td>
                  <td className="p-2">{getCommunityName(c.communityId)}</td>
                  <td className="p-2">{c.flat}</td>
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
        ) : (
          <p className="text-gray-500 text-sm">No customers found.</p>
        )}
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
                  className="w-full border rounded-md p-2"
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
