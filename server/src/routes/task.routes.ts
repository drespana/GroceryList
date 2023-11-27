import * as express from "express";
import * as mongodb from "mongodb";
import { taskCollections } from "../db/database"

export const taskRouter = express.Router();
taskRouter.use(express.json());


// GET all items
taskRouter.get("/", async (_req, res) => {
    try{
        const allTasks = await taskCollections.tasks?.find({}).toArray();
        res.status(200).send(allTasks);
    } catch (err) {
        res.status(500).send(err.message)
    }
}); 