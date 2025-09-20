import db from "./conn.mjs";
//import { ObjectID } from "mongodb";

//const collection = db.collection

export default async function startDatabase(req, res) {
    db.createCollection("exampleEntry");
}