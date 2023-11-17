import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./src/db/database";
import { itemRouter } from "./src/routes/item.routes";

// load env variables
dotenv.config();

const uri = process.env.DB_CONN_STRING;

if (!uri) {
    console.log("No env variable found");
    process.exit(1);
}

connectToDatabase(uri)
    .then(()=>{
        const app = express();
        app.use(cors());
        app.use("/groceries", itemRouter)
        app.listen(5200, ()=> {
            console.log("Server running at http://localhost:5200");
        })
    })
    .catch(error => console.error(error));
