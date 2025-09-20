import express from "express";
import dotenv from "dotenv";

// Setups
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;



// Listen
app.listen(PORT, () => {
  console.log(`Server Runing on Port: ${PORT}`);
});