 import express from 'express';
 import dotenv from 'dotenv';
 import connectDB from './database/db.js';
 import userRoutes from './routes/user.routes.js';
 import cookieParser from 'cookie-parser';
 import cors from "cors";

 dotenv.config({});

 // call database connection
 connectDB();

  const app = express();
  const PORT = process.env.PORT || 3000;

// deafault middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8080",
    credentials:true}));
  // apis
  app.use("/api/v1/user" , userRoutes);

 
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });