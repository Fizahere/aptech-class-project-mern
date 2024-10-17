import { Schema, model } from "mongoose";
import { Faculty } from "./Faculty.js";

const studentSchema = new Schema(
    {
        student_id: {
            type: String,
            required: true,
            unique: true,
        },
        student_name: {
            type: String,
            required: true,
        },
        faculty: {
            type: Schema.Types.ObjectId,
            ref: Faculty, 
            required: true,
        }
    }
);

const Student = model("Student", studentSchema);

export default Student;
