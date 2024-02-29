import * as express from "express";
import * as mongodb from "mongodb";
import { taskCollections } from "../db/database"
import { encrypt, decrypt } from "../util/encrypt";
import { requiresAuth } from "express-openid-connect";

export const taskRouter = express.Router();
taskRouter.use(express.json());

// define type for encrypted data
type EncryptedData = {
  [key: string]: string | any;
};
type DecryptedData = {
  [key: string]: string | any;
};

// GET all items
taskRouter.get("/", requiresAuth(), async (_req, res) => {
  try {
    const allTasks = await taskCollections.tasks
      ?.find({})
      .toArray();
    const decryptedTasks: any[] = [];
    for (const item of allTasks) {
      const decryptedTask: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedTask[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedTask[key] = value;
        }
      }
      decryptedTasks.push(decryptedTask);
    }
    res.status(200).send(decryptedTasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST
taskRouter.post("/", requiresAuth(), async (req, res) => {
  try {
    const task = req.body;
    const encrypted: EncryptedData = {};

    for (const [key, value] of Object.entries(task)) {
      if (typeof value === "string") {
        encrypted[key] = encrypt(value);
      } else {
        encrypted[key] = value;
      }
    }

    // set item info
    const newTask = {
      _id: task._id,
      owner: encrypt(req.oidc.user.email),
      ...encrypted,
    };

    // insert encrypted item
    const result = await taskCollections.tasks?.insertOne(newTask);
    if (result?.acknowledged) {
      res.status(201).send(`Created a new task: ID ${result.insertedId}`);
    } else {
      res.status(500).send("Failed to create new task.");
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// DELETE
taskRouter.delete("/:id", requiresAuth(), async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const task = await taskCollections.tasks?.findOne(query)
    const decryptedOwner = decrypt(task.owner);
    if (decryptedOwner == req.oidc.user.email) {
      const result = await taskCollections.tasks?.deleteOne(query);
      if (result && result.deletedCount) {
        res.status(200).send(`Removed task: ID ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove task: ID ${id}`);
      } else {
        res.status(404).send(`failed to remove task: ID ${id}`);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});