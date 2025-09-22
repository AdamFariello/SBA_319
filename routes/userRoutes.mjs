import express from "express";
import Users from "../models/usersSchema.mjs";
import db from "../db/conn.mjs";
import mongoose from "mongoose";

import error from "../middleware/errors.mjs";

const router = express.Router(); 
let userColl = db.collection("user");

/*
//Use for testing body messages
{
  "username":"username",
  "password":"password"
}
//patch
{
  "username":"username",
  "oldPassword":"password",
  "newPassword":"dogmatica"
}
*/

router.route("/")
      .get(async (req, res) => {
        let getUser;
        if (req.query.user) {
            getUser = await userColl.find({"username":req.query.user}).toArray();
        } else {
            getUser = await userColl.find({}).toArray();
            //getUser = await Users.find({}); //TODO: figure out why the mongoose is giving blanks
        }
        res.json(getUser);
      })
      .post(async (req, res, next) => {
        try {
          await userColl.insertOne(req.body);
          res.json(req.body);
        } catch (e) {
          console.error(e);
          next(error(400, e))
        }
      })
      .delete(async (req, res, next) => {
        if (req.body.username && req.body.password) {
          let query = {
            username: String(req.body.username),
            password: String(req.body.password)
          }
          let result = await userColl.deleteOne(query);

          if (result["deletedCount"]) {
            res.json(result);
          } else {
            //res.json("Error occured, user wasn't deleted");
            next(error(400, "Error occured, user wasn't deleted"));
          }
        } else { 
          //res.json("ERROR: missing username or password");
          next(error(400, "ERROR: missing username or password"));
        }
      })
      .patch(async(req, res, next) => {
        if (req.body.username && req.body.oldPassword && req.body.newPassword) {
          if (req.body.oldPassword != req.body.newPassword) {
            let query = {
              username: String(req.body.username),
              password: String(req.body.oldPassword)
            }
            let updateObject = { $set: { password: req.body.newPassword } };
            let result = await userColl.updateOne(query, updateObject)  
            res.json(result);
          } else {
            next(error(403, "ERROR: YOUR NEW PASSWORD CAN'T BE THE SAME AS THE OLD ONE"));  
          }  
        } else { 
          //res.json("ERROR: missing username, old password, and/or new password");
          next(error(400, "ERROR: missing username, old password, and/or new password")); 
        }
      })

router.route("/:user")
      .get(async (req, res) => {
        let getUser = await userColl.find({"username":req.params["user"]}).toArray();
        res.json(getUser);
      })


export default router;