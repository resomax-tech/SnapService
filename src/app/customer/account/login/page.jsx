"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock } from 'lucide-react'
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/lib/authContext";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth()
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams()
  const redirectURL = searchParams.get('redirect') || '/'


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', form)
      const data = response.data

      setMessage(data.msg || data.error)
      console.log(data.msg);
      
      await refreshUser()
      setTimeout(() => {
        router.push(redirectURL)
      }, 1500);

    } catch (error) {
      setMessage("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col  bg-white px-6 pt-10">

      <h2 className="text-3xl font-bold mb-2">Welcome</h2>
      <p className="mb-6 text-lg">
        Don’t have an account?{" "}
        <Link href="/customer/account/register" className="text-[#dba144] font-semibold">
          Register
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3"
            placeholder="Enter your mobile"
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
            className="w-full border border-gray-300 rounded-md px-4 py-3"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex justify-end mb-6">
          <p className="flex items-center gap-2 font-bold text-lg">
            <Lock className="w-5 h-5 text-gray-600 " />
            <Link href="/customer/account/register" className="text-black font-semibold">
              Forgot Password ?
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-[#dba144] text-white py-3 rounded-md hover:bg-yellow-600 font-semibold text-xl"
        >
          Login
        </button>
      </form>

      {message && (
        <p className="mt-4 font-semibold text-red-600">{message}</p>
      )}
    </div>
  );
}

