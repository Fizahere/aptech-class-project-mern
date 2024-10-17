import { Router } from "express";
import Student from "../models/Student.js";

export const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
    try {
        const students = await Student.find().populate("faculty")
        res.json(students);
    } catch (error) {
        res.json(error)
    }
});

// Fetch students based on faculty ID
studentRouter.get("/:faculty_id", async (req, res) => {
    try {
        const { faculty_id } = req.params;
        // Find students that match the faculty_id
        const students = await Student.find({ faculty: faculty_id }).populate("faculty");
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

studentRouter.post("/", async (req, res) => {
    try {
        const { student_id, student_name, faculty_id } = req.body;
        const student = Student({ student_id, student_name, faculty: faculty_id });
        await student.save()
        res.status(201).json({ student })
    } catch (error) {
        res.json(error)
    }
});