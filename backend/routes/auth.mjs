import express from "express";
import {check,validationResult} from 'express-validator';
import User from '../models/UserSchema.mjs';
import Doner from '../models/DonerSchema.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchUser from "../middleware/fetchUser.mjs";

const authRouter = express.Router();
const JWT_SECRET = "thisisaninotebookapplicationwhichisthenotebookonthecloud";

authRouter.post('/createUser',[check('name','Name must have at least three characters').isLength({min: 3}),check('email','Email is not valid').isEmail(),check('password','Password must be of at least 8 characters').isLength({min: 8})],async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json(errors);
    }
    else{
        try{
            const user = await User.findOne({email: req.body.email});
            if(user){
                res.status(400).json({message: "A user with the given email already exists."});
            }
            else{
                const password = req.body.password;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt);
                req.body.password = hashedPassword;
                const user = new User(req.body);
                await user.save();
                console.log(user._id.toString());
                const payload = {
                    id: user._id.toString()
                };
                const authToken = jwt.sign(payload,JWT_SECRET);
                res.status(200).json({message: "User created successfully", authToken: authToken});
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
});


authRouter.post('/loginUser', [check('email','Email is not valid').isEmail(),check('password','Password must have a value').exists()], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({message: errors});
    }
    const user = await User.findOne({email: req.body.email});

    if(!user){
        res.status(400).json({message: "Invalid username or password."});
    }
    else{
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            res.status(400).json({ message: "Invalid username or password." });
        }
        else{
            const payload = {
                id: user._id.toString()
            }
            const authToken = jwt.sign(payload,JWT_SECRET);
            res.status(200).json({message: "User logged in successfully", authToken: authToken});
        }
    }
});


authRouter.post('/getUser',fetchUser,async (req,res)=>{
    try {
        const user = await User.findById({_id: req.id}).select("-password");
        if(!user){
            res.status(401).json({message : "Please authenticate with a valid token"});
        }
        else{
            res.status(200).json({user: user});
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({message : "Please authenticate with a valid token"});
    }
});

authRouter.post('/createDoner',async (req,res)=>{
    try {
        const doner = await Doner.findOne({ email: req.body.email });
        if (doner) {
            res.status(400).json({ message: "A user with the given email already exists." });
        }
        else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const doner = new Doner(req.body);
            await doner.save();
            console.log(doner._id.toString());
            const payload = {
                id: doner._id.toString()
            };
            const authToken = jwt.sign(payload, JWT_SECRET);
            res.status(200).json({ message: "User created successfully", authToken: authToken });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

authRouter.post('/loginDoner', async (req, res) => {
    const doner = await Doner.findOne({ email: req.body.email });

    if (!doner) {
        res.status(400).json({ message: "Invalid username or password." });
    }
    else {
        const isMatch = await bcrypt.compare(req.body.password, doner.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid username or password." });
        }
        else {
            const payload = {
                id: doner._id.toString()
            }
            const authToken = jwt.sign(payload, JWT_SECRET);
            res.status(200).json({ message: "User logged in successfully", authToken: authToken });
        }
    }
});



export default authRouter;