import { MongoClient } from "./deps.ts";

// jQusRCeTTIaWtbQi
const client = new MongoClient();
client.connectWithUri(Deno.env.get('MONGODB_URI') || "");

const db = client.database(Deno.env.get('DB_NAME') || "");

export default db;

export const userCollection = db.collection("users");
