import { Router } from "express";
import { signUp, logIn, logout } from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.js";

const Route = Router();

Route.post('/signup', signUp);
Route.post('/login', logIn);

Route.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

Route.get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

Route.get('/logout', verifyToken, logout);

export default Route;