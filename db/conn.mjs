import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

// Load connectionString
const connectionString = process.env.atlasURI || "";

// Create a new MongoClient
const client = new MongoClient(connectionString);

// Establist DB connection
let conn;

try {
    conn = await client.connect();
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

// choose database & export
let db = conn.db('sample_training');

export default db;