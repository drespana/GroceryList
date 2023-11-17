import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../db/database"

export const itemRouter = express.Router();
itemRouter.use(express.json());


// GET all items
itemRouter.get("/", async (_req, res) => {
    try{
        const allItems = await collections.items?.find({}).toArray();
        res.status(200).send(allItems);
    } catch (err) {
        res.status(500).send(err.message)
    }
}); 

// GET by frequency
// GET by store
// GET by out of stock
itemRouter.get("/out-of-stock", async (req, res) => {
    try {
        const oosItems = await collections.items?.find({inStock:0}).toArray();
        res.status(200).send(oosItems);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// GET item by id
itemRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = {_id: new mongodb.ObjectId(id)};
        const item = await collections.items?.findOne(query);

        if (item) {
            res.status(200).send(item);
        } else {
            res.status(404).send(`Failed to find an item: ID: ${id}`)
        }
    } catch (err) {
        res.status(404).send(`Failed to find an item: ID ${req?.params?.id}`)
    }
})

// POST item to db
itemRouter.post("/", async (req, res) => {
    try {
        const item = req.body;
        const result = await collections.items?.insertOne(item);

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

// PUT by id
itemRouter.put("/:id", async (req, res) => {
    try {
    const id = req?.params?.id;
    const item = req.body;
    const query = { _id: new mongodb.ObjectId(id)}
    const result = await collections.items?.updateOne(query, {$set: item});
        console.log(result)

    if (result && result.matchedCount) {
        res.status(200).send(`Updated item: ID ${id}`);
    } else if (!result?.matchedCount){
        res.status(304).send(`Failed to update: ID ${id}`)
    } else {
        res.status(304).send(`failed to update: ID ${id}`)
    }
} catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
}
})


// DELETE 
itemRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id)};
        const result = await collections.items?.deleteOne(query);
        

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