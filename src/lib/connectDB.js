import mongoose from "mongoose";

let isConnected = false

const database_connection = async ()=>{
    if(isConnected){
        console.log("reusing database connection")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true
        console.log("Database connected")
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

export default database_connection