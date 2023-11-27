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

// POST 
reminderRouter.post("/", async (req, res) => {
    try {
        const task = req.body;
        const result = await reminderCollections.reminders?.insertOne(task);

        if (result?.acknowledged){
            res.status(201).send(`Created a new item: ID ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create new item.")
        }
    } catch (err){
        console.error(err.message);
        res.status(400).send(err.message)
    }
})

// DELETE 
reminderRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id)};
        const result = await reminderCollections.reminders?.deleteOne(query);
        

        if (result && result.deletedCount) {
            res.status(200).send(`Removed item: ID ${id}`);
        } else if (!result){
            res.status(400).send(`Failed to remove item: ID ${id}`);
        } else {
            res.status(404).send(`failed to remove item: ID ${id}`)
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})