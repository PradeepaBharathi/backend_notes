import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()


const connectionString = process.env.MONGO_URL

export async function dbConnection() {
    const client = new MongoClient(connectionString)
    await client.connect()
    console.log("DB COnnected")
    return client
}

export  const client = await dbConnection()
