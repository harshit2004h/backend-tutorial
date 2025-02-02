//require('dotenv').config({path:'./env'});
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: './env' })

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
    

/*
//Approach-1
import express from "express";
const app = express();
;(async()=>{
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('Database is connected to:', db.connection.name)
        app.on("error", (error) => {
            console.error("Express error: ", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT}`);
        })
    } catch (error) {
        console.error(error)
        throw error
    }
})()    
*/