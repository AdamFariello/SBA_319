import express from "express";
import db from "../db/conn.mjs";

const router = express.Router(); 
let pizzaColl = db.collection("pizza");


router.route("/")
      .get(async (req, res) => {
        let getPizza;
        if (req.query.pizza) {
            getPizza = await pizzaColl.find({"pizzaName":req.query.pizza}).toArray();
        } else {
            getPizza = await pizzaColl.find({}).toArray();
        }
        res.json(getPizza);
      })

router.route("/:pizza/")
      .get(async (req, res) => {
        let getPizza = await pizzaColl.find({"pizzaName":req.params.pizza}).toArray();
        res.json(getPizza);
      })

export default router;