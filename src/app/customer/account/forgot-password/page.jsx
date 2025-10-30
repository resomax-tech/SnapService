"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // --- Send OTP ---
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post("/api/auth/forgot-password", { mobile });
            if (response.data.success) {
                setOtpSent(true);
                setMessage("OTP sent! Please check your mobile.");
            } else {
                setMessage(response.data.message || "Failed to send OTP");
            }
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Error sending OTP");
        } finally {
            setLoading(false);
        }
    };

    // --- Verify OTP ---
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post("/api/auth/verify-reset-otp", { mobile, otp });
            if (response.data.success) {
                setOtpVerified(true);
                setMessage("OTP verified! You can now reset your password.");
            } else {
                setMessage(response.data.message || "Invalid OTP");
            }
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Error verifying OTP");
        } finally {
            setLoading(false);
        }
    };

    // --- Update Password ---
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("/api/auth/update-password", { mobile, password });
            if (response.data.success) {
                setMessage("Password updated successfully! Redirecting to login...");
                setTimeout(() => router.push("/customer/account/login"), 1500);
            } else {
                setMessage(response.data.message || "Failed to update password");
            }
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Error updating password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white px-6 pt-10">
            <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

            <form className="w-full max-w-md space-y-4">

                {/* Mobile input always visible */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-3"
                        placeholder="Enter your mobile"
                        pattern="\d{10}"
                        required
                        disabled={otpSent} // disable after sending OTP
                    />
                </div>

                {/* Send OTP button */}
                {!otpSent && (
                    <button
                        onClick={handleSendOTP}
                        className="w-80 bg-[#dba144] text-white py-2 rounded-md hover:bg-yellow-600 font-semibold text-xl flex items-center justify-center mx-auto"
                        disabled={loading}
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                )}

                {/* OTP input & Resend */}
                {otpSent && !otpVerified && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                OTP <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3"
                                placeholder="Enter OTP"
                                required
                            />
                        </div>

                        {message && (
                            <p className="mt-4 font-semibold text-red-600 text-center">{message}</p>
                        )}

                        <button
                            onClick={handleVerifyOTP}
                            className="w-80 bg-[#dba144] text-white py-2 rounded-md hover:bg-yellow-600 font-semibold text-xl mb-2 flex items-center justify-center mx-auto"
                            disabled={loading}
                        >
                            {loading ? "Verifying OTP..." : "Verify OTP"}
                        </button>

                        {/* Resend OTP */}
                        <button
                            type="button"
                            onClick={async () => {
                                setLoading(true);
                                setMessage("");
                                try {
                                    const response = await axios.post("/api/auth/forgot-password", { mobile });
                                    if (response.data.success) {
                                        setMessage("OTP resent successfully!");
                                        setOtp("");
                                    } else {
                                        setMessage(response.data.message || "Failed to resend OTP");
                                    }
                                } catch (err) {
                                    console.error(err);
                                    setMessage(err.response?.data?.message || "Error resending OTP");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            className="w-80 border bg-[#dba144] rounded-md py-2 mt-4 text-center font-semibold hover:bg-amber-500 mx-auto block"
                            disabled={loading}
                        >
                            {loading ? "Resending..." : "Resend OTP"}
                        </button>
                    </>
                )}

                {/* Password fields show after OTP verified */}
                {otpVerified && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3"
                                placeholder="Enter new password"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3"
                                placeholder="Confirm new password"
                                required
                            />
                        </div>

                        <button
                            onClick={handleUpdatePassword}
                            className="w-full bg-[#dba144] text-white py-3 rounded-md hover:bg-yellow-600 font-semibold text-xl"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </>
                )}
            </form>


        </div>
    );
}
