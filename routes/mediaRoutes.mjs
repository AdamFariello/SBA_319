import express from "express";
import db from "../db/conn.mjs";
import error from "../middleware/errors.mjs";
const router = express.Router(); 

let userColl = db.collection("user");
let pizzaColl = db.collection("pizza");
let mediaColl = db.collection("media");


//router.get("/raw", async (req, res) => {

router.get("/", async (req, res) => {
        let media = await mediaColl.find({}).toArray();
        res.json(media);
});

router.route("/searchraw")
        //Test url example (below wont work since database has been re-initalized):
        //localhost:4000/api/media/searchraw/?username=arichardind
        
        //TODO: create a req.username || req.pizza if statement so I can reuse code
      .get(async (req, res, next) => {
        if (req.query.username && req.query.pizza) {
            let getPizza = await pizzaColl.find({"pizzaName":req.query.pizza}).toArray();
            let getUser = await userColl.find({"username":req.query.username}).toArray();

            if (getPizza.length != 0 && getUser.length != 0) {
                let getMedia = await mediaColl.find({
                    username: getUser[0]["_id"], //ObjectId(getUserID),
                    pizzaName: getPizza[0]["_id"] //ObjectId(getPizzaID)
                }).toArray();
                if (getMedia.length != 0) { res.json(getMedia); } //TODO: Put outside for reuse
                else {next(error(404, "ERROR: No entry containing that pizza")); }                
            } else {next(error(404, "ERROR: No pizza or username conaining that name was found"));}
            
        } else if (req.query.username) {
            let getUser = await userColl.find({"username":req.query.username}).toArray();
            
            if (getUser.length != 0) {
                let getMedia = await mediaColl.find({username: getUser[0]["_id"]}).toArray();
                if (getMedia.length != 0) { res.json(getMedia); } //TODO: Put outside for reuse
                else {next(error(404, "ERROR: No entry containing that pizza")); }
            } else {next(error(404, "ERROR: username using that name was found"));}

        } else if (req.query.pizza) {
            let getPizza = await pizzaColl.find({"pizzaName":req.query.pizza}).toArray();
            if (getPizza.length) {
                let getMedia = await mediaColl.find({pizzaName: getPizza[0]["_id"]}).toArray();
                if (getMedia.length != 0) { res.json(getMedia); } //TODO: Put outside for reuse
                else {next(error(404, "ERROR: No entry containing that pizza")); }
            } else {next(error(404, "ERROR: No Pizza with that name found"));}

        } else {next(error(400, "ERROR: no query arguments given"));}
      });
export default router;