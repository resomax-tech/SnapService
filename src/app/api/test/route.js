import { hashPassword, comparePassword, generateToken } from "@/lib/auth";
import database_connection from "@/lib/connectDB";

export async function GET(){
    
    await database_connection()
    let pw = await hashPassword("Roy@2002")
    console.log("password",pw);

    console.log(await comparePassword("Roy@2002", pw));

    const user = {
        _id: 451,
        name: "kalyan",
        mobile: 6302525995
    }

    console.log("token: ", await generateToken(user));

    return Response.json({msg:"working"});
}