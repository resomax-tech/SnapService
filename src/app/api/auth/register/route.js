import dbConnect from "@/lib/connectDB";
import User from "@/models/UserModel";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(req) {
    try {
        await dbConnect()
        
        const body = await req.json()
        const {name, email, mobile, password} = body
        const hash = await hashPassword(password)

        if(User.findOne({mobile})){
            return NextResponse.json({msg: "User already registered, pls login"}, {})
        }

        const response = await User.create({name, email, mobile, password: hash})
        console.log(response);        
        return  NextResponse.json({msg:"Registered successfully"}, {status:201}, {user: response})
    } catch (error) {
        console.error("Error: ", error.message)
        return  NextResponse.json({msg: error.message}, {status:500})
    }
}