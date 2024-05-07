import express from "express";
import { pythonCompile } from "../controller/pythonCompile.controller.js";


const router = express.Router(); // Call express.Router() to create a new router instance

router.post('/compile',pythonCompile);

export default router;

