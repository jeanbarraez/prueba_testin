import express from "express";
import {getAllcontroller, getByIdcontroller, createcontroller,updatecontroller , deletecontroller, notFound} from "../src/controllers/cafesController.js"

const router = express.Router();

router.get("/cafes",getAllcontroller)

router.get("/cafes/:id",getByIdcontroller)

router.post("/cafes",createcontroller)

router.put("/cafes",updatecontroller)

router.delete("/cafes/:id",deletecontroller)

router.all("*", notFound)

export default router;