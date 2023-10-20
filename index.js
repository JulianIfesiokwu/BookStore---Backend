import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";    
import booksRoutes from "./routes/booksRoute.js";

const app = express();

// middleware for parsing requests
app.use(express.json());

// cors policy
app.use(cors());

// Route to home page
app.get("/", (req, res) => {
  res.status(200).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", booksRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, (req, res) => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
