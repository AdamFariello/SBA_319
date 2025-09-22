import express from "express";
import db from "../db/conn.mjs";
import error from "../middleware/errors.mjs";

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
      .get(async (req, res, next) => {
        let getPizza = await pizzaColl.find({"pizzaName":req.params.pizza}).toArray();
        
        if (getPizza.length != 0) { 
            let getPizzaID = getPizza[0]["_id"];
        } else {
            //res.json("ERROR: no pizza like that found")
            next(error(404, "ERROR: no pizza like that found"));
        }
        res.json(getPizza);
      })

router.get("/:pizza/img", async(req, res) => {
    res.redirect(`/api/pizza/${req.params.pizza}/image`)
});
router.route("/:pizza/image")
      .get(async (req, res) => {
        let getPizza = await pizzaColl.find({"pizzaName":req.params.pizza}).toArray();
        res.json({"pizzaLink": getPizza[0]["pizzaLink"]});
      })

export default router;