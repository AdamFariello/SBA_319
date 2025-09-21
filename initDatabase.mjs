import db from "./db/conn.mjs";
//import { ObjectID } from "mongodb";
import {userData, pizzaData} from "./db/data.mjs";

export default async function initDatabase() {
    //console.log(`[DEBUG] -- Connection is ${db}`)

    // Create user table
    db.createCollection("user");
    let userColl = await db.collection("user");
    userColl.deleteMany({}); // Empties table so I can refresh with data
    await db.collection("user").insertMany(userData);


    // Create pizza table
    db.createCollection("pizza");
    let pizzaColl = await db.collection("pizza");
    pizzaColl.deleteMany({});
    await db.collection("pizza").insertMany(pizzaData);


    // Getting the entries
    db.createCollection("media");
    let mediaColl = await db.collection("media");
    mediaColl.deleteMany({});
    


    // TODO: make this not have duplicates
    // TODO: Bug fix this so it doesn't randomly crash during calls
    let mediaCollEntrys = [];
    for (let i = 0; i < 20; i++) {
        let username;
        do {
            username = await userColl.aggregate([{$sample:{size:1}}]).toArray();
        } while (username.length == [])
        const usernameID = username[0]["_id"]; //TODO: figure if I should chain a .toString();

        let pizzname;
        do {
            pizzname = await pizzaColl.aggregate([{$sample:{size:1}}]).toArray();
        } while (username.length == [])
        const pizzResult = username[0]["_id"];
        

        let obj = {
            "username": usernameID,
            "pizzaName":pizzResult,
            "appetizingScore": Math.round(Math.random()* 5)
        };
        mediaCollEntrys.push(obj);
    }
    console.log(`[DEBUG] -- Finished with the while loop`);
    await mediaColl.insertMany(mediaCollEntrys);
}

console.log("Starting initializing of the database");
initDatabase();
console.log("Database has been initalized!")