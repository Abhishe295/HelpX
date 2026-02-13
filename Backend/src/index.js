import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express(); 

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL, ]
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // mobile / postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS: " + origin), false);
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
})