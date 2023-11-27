import * as express from "express";
import * as mongodb from "mongodb";
import { reminderCollections } from "../db/database"

export const reminderRouter = express.Router();
reminderRouter.use(express.json());


// GET all items
reminderRouter.get("/", async (_req, res) => {
    try{
        const allTasks = await reminderCollections.reminders?.find({}).toArray();
        res.status(200).send(allTasks);
    } catch (err) {
        res.status(500).send(err.message)
    }
}); 