import { verifyOTP } from "@/lib/twilio";

export async function POST(req) {
  try {
    const { mobile, otp } = await req.json();
    if (!mobile || !otp) return new Response(JSON.stringify({ success: false, message: "Invalid input" }), { status: 400 });

    const verified = await verifyOTP(mobile, otp);
    if (!verified) return new Response(JSON.stringify({ success: false, message: "Invalid OTP" }), { status: 400 });

    return new Response(JSON.stringify({ success: true, message: "OTP verified successfully" }), { status: 200 });

  } catch (err) {
    console.error("Reset OTP verification error:", err);
    return new Response(JSON.stringify({ success: false, message: "Verification failed", error: err.message }), { status: 500 });
  }
}
