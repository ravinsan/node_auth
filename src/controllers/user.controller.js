import User from "../models/user.model.js";
import becrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
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

// Login start
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
        
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000, 
          });

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
// Login end

// Update Profile start
export const updateProfile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }
    const { name, email, mobile, status } = req.body;
    const filename = req.file.filename;
    const emailid = req.user.email;

    try {
        // Check if user exists
        const user = await User.findOne({ email: emailid });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Update the user record
        const updatedUser = await User.findOneAndUpdate(
            { email: emailid }, 
            {
                name: name,
                mobile: mobile,
                status: status,
                image: filename
            }, 
            { new: true } 
        );

        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

// Logout start
 export const logout = (req, res) =>{
    res.clearCookie('token');
    res.status(200).json({
        message: "User logged out successfully"
    });
}
// Logout end