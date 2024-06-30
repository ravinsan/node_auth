import { Router } from "express";
import { signUp, logIn } from "../controllers/user.controller.js";

const Route = Router();

Route.post('/signup', signUp);
Route.post('/login', logIn);

export default Route;