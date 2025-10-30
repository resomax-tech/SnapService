"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Building2, UserCog, Users, CalendarSync } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      const response = await axios.get("/api/auth/admin/overview", { withCredentials: true });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  // 🔹 Summary Cards
  const cardStats = [
    { name: "Customers", value: stats.usersCount, icon: <Users size={28} />, color: "bg-green-100 text-green-600" },
    { name: "Communities", value: stats.communityCount, icon: <Building2 size={28} />, color: "bg-blue-100 text-[#4653f2]" },
    { name: "Workers", value: stats.workerCount, icon: <UserCog size={28} />, color: "bg-purple-100 text-purple-600" },
    { name: "Subscriptions", value: stats.subscriptionCount, icon: <CalendarSync size={28} />, color: "bg-red-100 text-[#e75c5e]" },
  ];

  // 🔹 Bar chart: Jobs per community
  function getCommunityJobsData() {
    if (!stats.totalCommunities || !stats.jobsPerCommunity) return [];
    return stats.jobsPerCommunity.map(job => {
      const community = stats.totalCommunities.find(c => c._id === job.community);
      return {
        community: community ? community.name : "Unknown",
        jobs: job.jobs
      };
    });
  }

  function DashboardChart({ data, title }) {
    return (
      <div className="p-5">
        <h3 className="font-semibold mb-3">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="community" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="jobs" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // 🔹 Helper to display subscription with actual names
  const getReadableSubscriptions = () => {
    if (!stats.totalSubscriptions) return [];

    return stats.totalSubscriptions.map(sub => {
      const user = stats.totalUsers?.find(u => u._id === sub.user);
      const community = stats.totalCommunities?.find(c => c._id === sub.community);
      return {
        ...sub,
        userName: user ? user.name || user.fullName || "Unknown User" : "Unknown User",
        communityName: community ? community.name : "Unknown Community"
      };
    });
  };

  const subscriptions = getReadableSubscriptions();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading
          ? Array(cardStats.length)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow flex items-center gap-4 animate-pulse"
                >
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="p-3 rounded-full bg-gray-200 w-12 h-12"></div>
                </div>
              ))
          : cardStats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white p-6 rounded-xl shadow flex items-center justify-between gap-4"
              >
                <div>
                  <h2 className="text-lg font-normal">{stat.name}</h2>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
              </div>
            ))}
      </div>

      {/* ===== Table + Chart ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {/* Subscriptions Table */}
        <div className="p-4 bg-white shadow rounded-lg border border-gray-100">
          <h3 className="font-semibold mb-3">Recent Subscriptions</h3>
          <table className="w-full text-sm border border-gray-100 rounded-lg overflow-y">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Community</th>
                <th className="p-2">Plan</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length > 0 ? (
                subscriptions.map((s, idx) => (
                  <tr key={s._id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                    <td className="p-2">{s.userName}</td>
                    <td className="p-2">{s.communityName}</td>
                    <td className="p-2 capitalize">{s.plan}</td>
                    <td className="p-2 text-right">₹{s.totalPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No recent subscriptions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bar Chart */}
        <div className="p-4 bg-white shadow rounded-lg border border-gray-100">
          <DashboardChart data={getCommunityJobsData()} title="Jobs Per Community" />
        </div>
      </div>
    </div>
  );
}
