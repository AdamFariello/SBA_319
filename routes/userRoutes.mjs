import express from "express";
import Users from "../models/usersSchema.mjs";

const router = express.Router(); 

router.route("/")
      .get(async (req, res) => {
        let getUsers = await Users.find({});
        res.json(getUsers);
      })


export default router;