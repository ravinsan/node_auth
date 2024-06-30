import User from "../models/user.model.js";
import becrypt from "bcrypt";

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