import User from "../models/user.model.js";
import becrypt from "bcrypt";
import jwt from "jsonwebtoken";
process.loadEnvFile();

export const signUp = async (req, res)=>{
    const {name, email, password, mobile, status} = req.body;
    const hashedPassword = await becrypt.hash(password, 10);
    

    try{
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            mobile,
            status
        });

        res.status(201).json({
            message: "User created successfully",
            // user
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

export const logIn = async (req, res) =>{

    const {email, password} = req.body;
    const secretKey = process.env.SECREST_KEY; 
          
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        const isMatch = await becrypt.compare(password, user.password);
        if(!isMatch){
            
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ email }, secretKey, { expiresIn: process.env.SECRET_KEY_EXPIRE });
        
        res.status(200).json({
            message: "User logged in successfully",
            "data": user,
            "token": token,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}