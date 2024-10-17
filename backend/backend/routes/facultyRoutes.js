import { Faculty } from "../models/Faculty.js";
import { Router } from "express";


export const facultyRouter = Router();

facultyRouter.get("/", async (req, res) => {
    try {
        const faculties = await Faculty.find()
        res.json(faculties);
    } catch (error) {
        res.json(error)
    }
});