import dbConnect from "@/lib/connectDB";
import User from "@/models/UserModel";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await dbConnect()
        
        const body = await req.json()
        const {name, email, mobile, password} = body
        const hash = await hashPassword(password)

        console.log(name, email, mobile, password);
        const user = await User.findOne({mobile})
        console.log("user:", user);
        
        if(user){
            return NextResponse.json({msg: "User already registered, pls login"}, {user: user}, {status: 400})
        }

        const response = await User.create({name, email, mobile, password: hash})
        console.log(response);        
        return  NextResponse.json({msg:"Registration successful! Redirecting to login..."}, {status:201}, {user: response})
    } catch (error) {
        console.error("Error: ", error.message)
        return  NextResponse.json({msg: error.message}, {status:500})
    }
}