// app/page.jsx
"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Send } from "lucide-react";

export default function Dashboard() {
  // Expense Breakdown Data
  const expenseData = [
    { name: "Daily need", value: 5720 },
    { name: "Savings", value: 2566 },
    { name: "Shopping", value: 2940 },
  ];
  const COLORS = ["#FF6B35", "#FF9F1C", "#FFB347"];

  // Income Trend
  const incomeTrend = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 13000 },
    { month: "Mar", value: 15280 },
  ];

  // Expense Trend
  const expenseTrend = [
    { month: "Jan", value: 9000 },
    { month: "Feb", value: 9800 },
    { month: "Mar", value: 10350 },
  ];

  // Transactions
  const transactions = [
    { date: "22 Mar, 2025", name: "Sandra Parker", method: "Visa ****123", amount: "-$18.99" },
    { date: "22 Mar, 2025", name: "Dianna Bahinger", method: "Visa ****123", amount: "-$4.50" },
    { date: "21 Mar, 2025", name: "Edwin Nienow", method: "Mastercard ****452", amount: "-$89.00" },
    { date: "20 Mar, 2025", name: "Elisa Larkin", method: "Stripe @hoangpts", amount: "+$120.00" },
    { date: "18 Mar, 2025", name: "Blake Sanford", method: "Visa ****123", amount: "-$12.50" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold">FinMove</div>
        <nav className="flex-1 px-4 space-y-2">
          {["Dashboard", "Wallet", "Analytics", "Transaction", "Manage", "History", "Report", "Settings", "Support"].map((item, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md cursor-pointer ${item === "Dashboard" ? "bg-orange-500" : "hover:bg-gray-700"}`}
            >
              {item}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700 text-sm">
          Thai Hoang <br /> freesable@gmail.com
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Send size={16} /> Sent
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded-md">Request</button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Total Balance</h2>
            <p className="text-2xl font-bold">$12,450.00</p>
            <p className="text-green-500 text-xs">+ $1,520 this month</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Total Income</h2>
            <p className="text-2xl font-bold">$15,280.00</p>
            <div className="h-20">
              <ResponsiveContainer>
                <LineChart data={incomeTrend}>
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-green-500 text-xs">↑ 15% last month</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Total Expense</h2>
            <p className="text-2xl font-bold">$10,350.00</p>
            <div className="h-20">
              <ResponsiveContainer>
                <LineChart data={expenseTrend}>
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-red-500 text-xs">↓ 10% last month</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Transaction History */}
          <div className="col-span-2 bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
            <div className="divide-y">
              {transactions.map((t, i) => (
                <div key={i} className="flex justify-between py-2">
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.date} • {t.method}</p>
                  </div>
                  <span className={t.amount.startsWith("-") ? "text-red-500" : "text-green-500"}>{t.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown + Exchange */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
              <div className="h-40">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={expenseData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-4 text-sm">
                {expenseData.map((e, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{e.name}</span>
                    <span>${e.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exchange */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Exchange</h2>
              <p className="text-sm">USD → VND</p>
              <p className="font-bold">$100.00</p>
              <p className="text-xs text-gray-500">Available: 2,560 USD</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
