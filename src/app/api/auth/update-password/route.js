import dbConnect from "@/lib/connectDB";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { mobile, password } = await req.json();
    if (!mobile || !password) return new Response(JSON.stringify({ success: false, message: "Invalid input" }), { status: 400 });

    await dbConnect();
    const user = await User.findOne({ mobile });
    if (!user) return new Response(JSON.stringify({ success: false, message: "User not found" }), { status: 404 });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return new Response(JSON.stringify({ success: true, message: "Password updated successfully" }), { status: 200 });

  } catch (err) {
    console.error("Update password error:", err);
    return new Response(JSON.stringify({ success: false, message: "Failed to update password", error: err.message }), { status: 500 });
  }
}
