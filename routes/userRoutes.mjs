import express from "express";
import Users from "../models/usersSchema.mjs";
import db from "../db/conn.mjs";
import mongoose from "mongoose";

const router = express.Router(); 
let userColl = db.collection("user");

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
          /*
          {
            "username":"username",
            "password":"password"
          }
          */
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
          //let deleteUSer = await Users.findBy
        } else { res.json("ERROR: missing username or password")}
      })

router.route("/:user")
      .get(async (req, res) => {
        let getUser = await userColl.find({"username":req.params["user"]}).toArray();
        res.json(getUser);
      })


export default router;