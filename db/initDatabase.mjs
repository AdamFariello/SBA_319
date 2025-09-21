import db from "./conn.mjs";
//import { ObjectID } from "mongodb";

export default async function initDatabase(req, res) {
    db.createCollection("test");
    
    let collection = await db.collection("test");
    collection.insertMany([{
        name: "Test data23qwewaq!",
    	accomdates: 42,
    	bedrooms: 9001,
    	beds: 0,
    	number_of_reviews: 0,
    }]);
}