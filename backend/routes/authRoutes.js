import { Router } from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
const { sign, verify } = jwt;
const { hash, compare } = bcrypt;

export const authRouter = Router();

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization;
        const contents = verify(token, 'aptech');
        req.user = contents.user
        next()
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

authRouter.post("/register", async (req, res) => {
    try {
        let { username, password } = req.body;
        password = await hash(password, 10);
        const user = User({ username, password })
        await user.save();
        res.status(201).json({ "message": "user registerd successfully" })
    } catch (error) {
        res.status(500).json({ message: 'internal server error.', error: error.message },)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        let { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ "message": "invalid credentials" });
        }
        password = await compare(password, user.password)
        if (!password) {
            res.status(401).json({ "message": "invalid credentials" });
        }
        const token = sign({ user: user._id }, "aptech")
        res.json({ token:token,user:user.username })
    } catch (error) {
        console.error(error.message)
    }
})

authRouter.get("/protected", verifyToken, async (req, res) => {
    try {
        const _id=req.user;
        const user= await User.findOne({_id});
        res.json({user:user.username})
    } catch (error) {
        res.json({message:'internal server error.'})
    }
})