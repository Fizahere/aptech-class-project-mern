import { Schema, model } from "mongoose";


const facultySchema = new Schema(
    {
        faculty_name: {
            type: String,
            required: true
        }
    }
);

export const Faculty = model("Faculty", facultySchema)