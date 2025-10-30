// src/app/admin/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/admin/', form)
      console.log(response.data);

      if (response.status == 200) {
        setError("")
        setMessage(response.data.msg)
        router.push("/admin"); // redirect to dashboard
      }
    } catch (error) {
      console.log("error: ", error.message);
      setMessage("")
      setError("Invalid username or password");
    }

  };

  return (
    <div className="grid place-items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center"
      >
        <img src="/headerlogo.png" alt="logo" className="h-8 my-5" />
        <h2 className="text-2xl font-bold text-center mb-6 mt-5">Admin Login</h2>

        {message && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm">
            {message}
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username / Email</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username or email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
