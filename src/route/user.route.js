import { Router } from "express";
import { signUp, logIn, logout, updateProfile } from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.js";
import multer from "multer";

const Route = Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

Route.post('/signup', signUp);
Route.post('/login', logIn);


Route.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

Route.post('/update-profile', verifyToken, upload.single('file'), updateProfile);


Route.get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

Route.get('/logout', verifyToken, logout);

export default Route;