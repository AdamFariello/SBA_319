import express from "express";
import Users from "../models/usersSchema.mjs";
import db from "../db/conn.mjs";
import mongoose from "mongoose";

const router = express.Router(); 
let userColl = db.collection("user");

/*
//Use for testing body messages
{
  "username":"username",
  "password":"password"
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
      .post(async (req, res) => {
        if (req.body.username && req.body.password) {
          //TODO: Figure out sometime how to use mongoose.model to create an entry
          //let newUser = new mongoose.model("newUser", Users.schema.obj);
          //newUser.username = req.body.username;
          //newUser.password = req.body.password;
          //newUser.save(null);
          //await db.collection("pizza").insertMany(pizzaData);

          //TODO: add a check to stop duplicate user entries
          let newUser = {
            "username": req.body.username,
            "password": req.body.password
          }
          userColl.insertOne(newUser);
          res.json(newUser);
        } else { res.json("ERROR: missing username or password")}
      })
      .delete(async (req, res) => {
        if (req.body.username && req.body.password) {
          let query = {
            username: String(req.body.username),
            password: String(req.body.password)
          }
          let result = await userColl.deleteOne(query);

          if (result["deletedCount"]) {
            res.json(result);
          } else {
            res.json("Error occured, user wasn't deleted");
          }
        } else { res.json("ERROR: missing username or password")}
      })
      .patch(async(req, res) => {
        /*
        {
          "username":"username",
          "oldPassword":"password",
          "newPassword":"dogmatica"
        }
        */
        if (req.body.username && req.body.oldPassword && req.body.newPassword) {
          let query = {
            username: String(req.body.username),
            password: String(req.body.oldPassword)
          }
          let updateObject = { $set: { password: req.body.newPassword } };
          let result = await userColl.updateOne(query, updateObject)  
          res.json(result);       
        } else { res.json("ERROR: missing username, old password, and/or new password") }
      })

router.route("/:user")
      .get(async (req, res) => {
        let getUser = await userColl.find({"username":req.params["user"]}).toArray();
        res.json(getUser);
      })


export default router;