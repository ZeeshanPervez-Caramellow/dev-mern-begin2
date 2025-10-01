import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv'
dotenv.config({ path: "./.env" });


;const connectDB = async function() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`DATABASE CONNECTED !!! HOST NAME : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("ERR:",error);
        process.exit(1);
    }
}

export default connectDB;