"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/lib/authContext";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect") || "/";
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({ mobile: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginMode, setLoginMode] = useState("password");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (loginMode === "password") {
        // --- Password Login ---
        const response = await axios.post("/api/auth/login", form);
        const data = response.data;
        setMessage(data.msg || data.error);

        if (data?.msg || !data.error) {
          await refreshUser();
          if (data.user?.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push(redirectURL);
          }

        }
      } else {
        // --- OTP Login ---
        if (!otpSent) {
          try {
            const response = await axios.post("/api/auth/send-otp", { mobile: form.mobile });

            if (response.data.success) {
              setOtpSent(true);
              setMessage("OTP sent successfully!");
            }
          } catch (err) {
            // ✅ Show message instead of alert
            if (err.response?.status === 404 && err.response?.data?.redirectToRegister) {
              setMessage("Mobile number not found. Please register first.");
            } else {
              setMessage(err.response?.data?.message || "Failed to send OTP");
            }
          }
        } else {
          // Verify OTP
          const response = await axios.post("/api/auth/verify-otp", {
            mobile: form.mobile,
            otp,
          });

          if (response.data.success) {
            await refreshUser();
            router.push(redirectURL);
          } else {
            setMessage(response.data.message || "Invalid OTP");
          }
        }
      }


    } catch (err) {
      console.error(err);
      setMessage("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-10">
      <h2 className="text-2xl font-bold mb-2">Welcome</h2>
      <p className="mb-6 text-lg">
        Don’t have an account?{" "}
        <Link href="/customer/account/register" className="text-[#dba144] font-semibold">
          Register
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Mobile Field */}
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

        {/* Password Field */}
        {loginMode === "password" && (
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
        )}

        {/* OTP Field */}
        {loginMode === "otp" && otpSent && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3"
              placeholder="Enter OTP"
              required
            />
          </div>
        )}

        {/* Forgot Password */}
        {loginMode === "password" && (
          <div className="flex justify-end mb-6">
            <p className="flex items-center gap-2 font-bold text-lg">
              <Lock className="w-5 h-5 text-gray-600" />
              <Link href="/customer/account/forgot-password" className="text-black font-semibold">
                Forgot Password ?
              </Link>
            </p>
          </div>
        )}

        {/* Message Display */}
        {message && (
        <p className="mt-4 font-semibold text-red-600 text-center">{message}</p>
      )}

        {/* ✅ Button Section */}
        {loginMode === "password" ? (
          <>
            {/* Main Login Button */}
            <button
              type="submit"
              className="w-80 bg-[#dba144] text-white py-2 rounded-md hover:bg-yellow-600 font-semibold text-xl flex items-center justify-center mx-auto"
            >
              Login
            </button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500 font-semibold">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Switch to OTP Button */}
            <button
              type="button"
              onClick={() => {
                setLoginMode("otp");
                setOtpSent(false);
                setOtp("");
                setMessage("");
              }}
              className="w-80 bg-[#dba144] text-white py-2 rounded-md hover:bg-yellow-600 font-semibold text-xl flex items-center justify-center mx-auto"
            >
              Login with OTP
            </button>
          </>
        ) : (
          <>
            {/* OTP Submit / Verify */}
            <button
              type="submit"
              className="w-80 bg-[#dba144] text-white py-2 rounded-md hover:bg-yellow-600 font-semibold text-xl flex items-center justify-center mx-auto"
            >
              {otpSent ? "Verify OTP" : "Send OTP"}
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500 font-semibold">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>


            {/* Switch back to Password Login */}
            <button
              type="button"
              onClick={() => {
                setLoginMode("password");
                setOtpSent(false);
                setOtp("");
                setMessage("");
              }}
              className="w-80 bg-[#dba144] text-white py-3 rounded-md hover:bg-yellow-600 font-semibold text-xl flex items-center justify-center mx-auto"
            >
              Login with Password
            </button>
          </>
        )}
      </form>

      
    </div>
  );
}
