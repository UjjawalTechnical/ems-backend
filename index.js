import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import designationRouter from "./routes/designation.js";
import connectToDB from "./db/db.js";

const PORT = process.env.PORT || 5000;

connectToDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter)
app.use("/api/departments", departmentRouter)
app.use("/api/designations", designationRouter)
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});