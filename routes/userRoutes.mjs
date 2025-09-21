import express from "express";
import Users from "../models/usersSchema.mjs";
import db from "../db/conn.mjs";

const router = express.Router(); 
let userColl = db.collection("user");

router.route("/")
      .get(async (req, res) => {
        let getUser;
        if(req.query.user) {
            getUser = await userColl.find({"username":req.query.user}).toArray();
        } else {
            getUser = await userColl.find({}).toArray();
        }
        res.json(getUser);
      })

router.route("/:user")
      .get(async (req, res) => {
        let getUser = await userColl.find({"username":req.params["user"]}).toArray();
        res.json(getUser);
      })


export default router;