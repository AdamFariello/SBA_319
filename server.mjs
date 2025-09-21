import express from "express";
import dotenv from "dotenv";

import error from "./middleware/errors.mjs";
//import initDatabase from "./initDatabase.mjs";

import userRoutes from "./routes/userRoutes.mjs"

// Setups
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

dotenv.config();
const PORT = process.env.PORT || 3001;

// Creating the database
//initDatabase();


// Routes
app.get("/", (req, res) => {
  res.json("Server is running");
});
app.use("/api/users", userRoutes)


// Middleware Error handling
app.use((req, res, next) => {
  next(error(505, "Resources not found"));
});
app.use((err, req, res, next) => {
  res.status(err.status || 400);
  res.json({error: err.message});
});

// Listen
app.listen(PORT, () => {
  console.log(`Server Runing on Port: ${PORT}`);
});