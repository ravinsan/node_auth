import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";

const Route = Router();

Route.post('/signup', signUp);

export default Route;