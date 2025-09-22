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
router.route("/search")
        //localhost:4000/api/media/search/?user=username&pizza=Margherita
      .get(async (req, res, next) => {
        if (req.query.pizza && req.query.user) {
            let getPizza = await pizzaColl.find({"pizzaName":req.query.pizza}).toArray();
            let getUser = await userColl.find({"username":req.query.user}).toArray();
            if (getPizza.length != 0 && getUser.length != 0) {
                let getPizzaId = getPizza[0]["_id"];
                let getUserId = getUser[0]["_id"];
                
                let getMedia = await media.find({
                    username: ObjectId(getUserID),
                    pizzaName: ObjectId(getPizzaID)
                }).toArray();

                if (getMedia.length != 0) {
                    res.json(getMedia);
                } else {
                    next(error(404, "ERROR: No entry containing that pizza"));
                }
                
            } else {
                next(error(404, "ERROR: No pizza or username conaining that name was found"));    
            }
            
            res.json(getPizza);
        } else { 
            //res.json("ERROR: no query arguments given");
            next(error(400, "ERROR: no query arguments given"));
        }
      });
    

router.route("/posts/users")
      .get(async (req, res) => {
        let media = await mediaColl.find({}).toArray();
        let getPizza = await pizzaColl.find({}).toArray();
        let userResult = await userColl.find({}).toArray();
        
        res.json(media);
      })


export default router;