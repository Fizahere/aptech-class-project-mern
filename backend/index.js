import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { studentRouter } from './routes/studentRoutes.js';
import { facultyRouter } from "./routes/facultyRoutes.js";
import { authRouter } from "./routes/authRoutes.js";

async function connect_db(){
    try {
        await mongoose.connect("mongodb+srv://fizabatool0278:Z3SiX64mDu1ejvg8@cluster0.3mcq6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.info("connected to mongodb")
        
    } catch (error) {
        console.error(error.message)
    }
}
connect_db();

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/students", studentRouter);
app.use("/api/faculties", facultyRouter);
app.use("/api/auth", authRouter);

app.listen(2000, () => {
    console.log("server is running on port 2000.")
})