import db from "./conn.mjs";
//import { ObjectID } from "mongodb";
import {userData, pizzaData} from "./data.mjs";

export default async function initDatabase(req, res) {
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
    
    /*
    let userRowsResult = await userColl.find({}).toArray();
    console.log(userRowsResult);
    console.log(userRowsResult.length)
    let result = await userColl.find({"username": "cchalliner0", "password" :"lK3+Y(HeOP8"}).toArray();
    console.log(result);
    */



    /*
    //TODO; in 600 years figure out why this didn't work
    //      (probably from the promise objects)
    let mediaCollTotalLength;
    do {
        console.log("[DEBUG] -- while loop entered?");
        let username, pizzname, isMediaPage;

        do {    
            username = await userColl.aggregate([{$sample:{size:1}}]).toArray();
            pizzname = await pizzaColl.aggregate([{$sample:{size:1}}]).toArray();
            isMediaPage = await mediaColl.find(
                {"username":username[0]["username"]},   
                {"pizzaName":pizzname[0]["pizzaName"]},
            )    
        } while(isMediaPage.length != 0)

        let result = mediaColl.insertOne({
            "username":username[0]["username"],   
            "pizzaName":pizzname[0]["pizzaName"],
            "appetizingScore": Math.round(Math.random()* 5)
        });
        console.log(`[DEBUG] -- ${result}`);

        mediaCollTotalLength = await mediaColl.find({}).toArray().length
    } while (mediaCollTotalLength < 20 )
    */

    /*
    // Problem: Code is insecure
    //          It requires a print statement for it to function
    let mediaCollEntry = [];
    let username, pizzname, isMediaPage;
    for (let i = 0; i < 20; i++) {
        do {    
            username = await userColl.aggregate([{$sample:{size:1}}]).toArray();
            pizzname = await pizzaColl.aggregate([{$sample:{size:1}}]).toArray();
            isMediaPage = mediaColl.find(
                {"username":username[0]["username"]},   
                {"pizzaName":pizzname[0]["pizzaName"]},
            )    
            console.log(isMediaPage.length);
        } while(isMediaPage.length != 0);

        const obj = {
            "username":username[0]["username"],
            "pizzaName":pizzname[0]["pizzaName"]
        };
        mediaCollEntry.push(obj);
    }
    */


    /*
    // TODO: make this not have duplicates
    // TODO: Bug fix this so it doesn't randomly crash during calls
    let mediaCollEntry = [];
    for (let i = 0; i < 20; i++) {
        let username = await userColl.aggregate([{$sample:{size:1}}]).toArray();
        //console.log(username);
        let usernameResult = await username[0]["username"];
        
         
        let pizzname = await pizzaColl.aggregate([{$sample:{size:1}}]).toArray();
        
        /*
        let obj = {
            "username": usernameResult,
            "pizzaName":pizzname[0]["pizzaName"],
            "appetizingScore": Math.round(Math.random()* 5)
        };
        mediaCollEntry.push(obj);
        
    }
    console.log(mediaCollEntry);
    console.log(`[DEBUG] -- Finished with the while loop`);
    */
}