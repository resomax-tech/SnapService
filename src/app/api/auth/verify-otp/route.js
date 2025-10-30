import { verifyOTP } from "@/lib/twilio";
import User from "@/models/UserModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/lib/connectDB";

export async function POST(req) {
  try {
    await dbConnect();

    const { mobile, otp } = await req.json();
    if (!mobile || !otp) return new Response(JSON.stringify({ success: false, message: "Invalid input" }), { status: 400 });

    const verified = await verifyOTP(mobile, otp);
    if (!verified) return new Response(JSON.stringify({ success: false, message: "Invalid OTP" }), { status: 400 });

    const user = await User.findOne({ mobile });
    if (!user) return new Response(JSON.stringify({ success: false, message: "User not found", newUser: true }), { status: 404 });

    // ✅ Create JWT token
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ Set cookie to match your AuthContext / profile API
    cookies().set({
      name: "access_token",       // must match profile route
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false in dev
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    });

    return new Response(JSON.stringify({ success: true, message: "OTP verified successfully" }), { status: 200 });
  } catch (err) {
    console.error("OTP verify error:", err);
    return new Response(JSON.stringify({ success: false, message: "Verification failed", error: err.message }), { status: 500 });
  }
}
