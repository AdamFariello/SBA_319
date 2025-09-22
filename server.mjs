import express from "express";
import dotenv from "dotenv";

import error from "./middleware/errors.mjs";
import loggingMiddleWare from "./middleware/loggingMiddleWare.mjs"; 
//import initDatabase from "./initDatabase.mjs";

import userRoutes from "./routes/userRoutes.mjs"
import pizzaRoutes from "./routes/pizzaRoutes.mjs";
import mediaRoutes from "./routes/mediaRoutes.mjs";

// Setups
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(loggingMiddleWare);

dotenv.config();
const PORT = process.env.PORT || 3001;

// Creating the database
//initDatabase();


// Routes
app.get("/", (req, res) => {
  res.json("Server is running");
});
app.use("/api/users", userRoutes);
app.use("/api/pizza", pizzaRoutes);
app.use("/api/media", mediaRoutes);

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