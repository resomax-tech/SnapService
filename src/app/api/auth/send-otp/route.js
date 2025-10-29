import { sendOTP } from "@/lib/twilio";
import dbConnect from "@/lib/connectDB";
import User from "@/models/UserModel";

export async function POST(req) {
  try {
    const { mobile } = await req.json();

    if (!mobile || mobile.length !== 10) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid mobile number" }),
        { status: 400 }
      );
    }

    // ✅ Connect to DB and check if user exists
    await dbConnect();
    const user = await User.findOne({ mobile });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Mobile number not found", redirectToRegister: true }),
        { status: 404 }
      );
    }

    // ✅ Send OTP via Twilio
    const verification = await sendOTP(mobile);

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP sent successfully",
        sid: verification.sid,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Twilio send OTP error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send OTP", error: err.message }),
      { status: 500 }
    );
  }
}
