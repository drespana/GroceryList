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

taskRouter.get("/weekly", async (req, res) => {
    try {
        const weeklyTasks = await taskCollections.tasks?.find({frequency:"Weekly"})
        res.status(200).send(weeklyTasks)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

taskRouter.get("/monthly", async (req, res) => {
    try {
        const monthlyItems = await taskCollections.tasks?.find({frequency:"Monthly"})
        res.status(200).send(monthlyItems)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// POST 
taskRouter.post("/", async (req, res) => {
    try {
        const task = req.body;
        const result = await taskCollections.tasks?.insertOne(task);

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
taskRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id)};
        const result = await taskCollections.tasks?.deleteOne(query);
        

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