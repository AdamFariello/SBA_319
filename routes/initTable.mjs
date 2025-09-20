import express from "express";
const router = express.Router();

router.get("/", async(req, res) => {
    res.json("Import is working");
});

export default router; 