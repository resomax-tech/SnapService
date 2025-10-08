"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    retypePassword: "",
    terms: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.terms) {
      setMessage(" Please accept the Terms & Conditions");
      return;
    }

    if (form.password !== form.retypePassword) {
      setMessage("Passwords do not match!");
      return;
    }

    // Save user data (excluding retypePassword)
    const { retypePassword, ...userData } = form;

    try {
      const response = await axios.post('/api/auth/register', userData)
      const data = response.data

      setMessage(data.msg || data.error);
      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
        retypePassword: "",
        terms: false,
      });

      setTimeout(() => {
        window.location.href = "/customer/account/login";
      }, 1500);
    } catch (error) {
      setMessage("Failed to register")
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-10">

      <h2 className="text-2xl font-bold mb-2">Create Account</h2>
      <p className="mb-6 text-xl">
        Already have an account?{" "}
        <Link href="/customer/account/login" className="text-[#dba144] font-semibold">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
            placeholder="Enter your fullname"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
            placeholder="Enter your mobile number"
            pattern="\d{10}"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
            placeholder="Enter your password"
            minLength={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Retype Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="retypePassword"
            value={form.retypePassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
            placeholder="Retype your password"
            minLength={3}
            required
          />
        </div>

        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="mr-2"
          />
          I accept the{" "}
          <span className="text-[#dba144] ml-1">Terms & Conditions</span>
        </label>

        <button
          type="submit"
          className=" bg-[#dba144] text-white py-2 rounded-md hover:bg-yellow-600 font-semibold text-md w-full mt-7"
        >
          Register
        </button>
      </form>

      {message && (
        <p className="mt-4 font-semibold text-red-600">{message}</p>
      )}
    </div>
  );
}
