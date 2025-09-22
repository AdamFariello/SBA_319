import express from "express";
import db from "../db/conn.mjs";

const router = express.Router(); 

let userColl = db.collection("user");
let pizzaColl = db.collection("pizza");
let mediaColl = db.collection("media");


router.get("/raw", async (req, res) => {
        let media = await mediaColl.find({}).toArray();
        res.json(media);
      })
router.route("/")
      .get(async (req, res) => {
        let media = await mediaColl.find({}).toArray();
        res.json(media);
      })


export default router;