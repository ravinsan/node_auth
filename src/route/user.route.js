import { Router } from "express";
import { signUp, logIn } from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.js";

const Route = Router();

Route.post('/signup', signUp);
Route.post('/login', logIn);

Route.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default Route;