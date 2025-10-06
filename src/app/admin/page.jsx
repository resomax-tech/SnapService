"use client";

import { Building2, UserCog, Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Communities", value: 2, icon: <Building2 size={28} />, color: "bg-blue-100 text-blue-600" },
    { name: "Workers", value: 2, icon: <UserCog size={28} />, color: "bg-green-100 text-green-600" },
    { name: "Customers", value: 2, icon: <Users size={28} />, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{stat.name}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
