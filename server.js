import express from "express";
import cors from "cors";

import cafeRoutes from "./routes/cafesRoutes.js";
import { notFound } from "./src/controllers/cafesController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/", cafeRoutes);
app.use("*", notFound);

//app.listen(PORT, console.log(`¡Servidor encendido en el puerto! ${PORT}`));

export default app;
