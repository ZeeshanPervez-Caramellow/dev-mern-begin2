//require("dotenv").config

import dotenv from "dotenv"
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import express from "express";

const app = express();


dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR:",error);
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`process is running at ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
});

















/*


import express from "express";
const app = express();

;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERR:",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("ERR:",error);
        throw error;
    }
})()
*/