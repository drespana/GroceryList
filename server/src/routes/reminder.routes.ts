import * as express from "express";
import * as mongodb from "mongodb";
import { reminderCollections } from "../db/database";
import { encrypt, decrypt } from "../util/encrypt";
import { requiresAuth } from "express-openid-connect";

export const reminderRouter = express.Router();
reminderRouter.use(express.json());

// define type for encrypted data
type EncryptedData = {
  [key: string]: string | any;
};
type DecryptedData = {
  [key: string]: string | any;
};

// GET all items
reminderRouter.get("/", requiresAuth(), async (_req, res) => {
  try {
    const allReminders = await reminderCollections.reminders
      ?.find({})
      .toArray();
    const decryptedReminders: any[] = [];
    for (const item of allReminders) {
      const decryptedReminder: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedReminder[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedReminder[key] = value;
        }
      }
      decryptedReminders.push(decryptedReminder);
    }
    res.status(200).send(decryptedReminders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST
reminderRouter.post("/", requiresAuth(), async (req, res) => {
  try {
    const reminder = req.body;
    //const result = await reminderCollections.reminders?.insertOne(Reminder);
    const encrypted: EncryptedData = {};

    for (const [key, value] of Object.entries(reminder)) {
      if (typeof value === "string") {
        encrypted[key] = encrypt(value);
      } else {
        encrypted[key] = value;
      }
    }

    // set item info
    const newReminder = {
      _id: reminder._id,
      owner: encrypt(req.oidc.user.email),
      ...encrypted,
    };

    // insert encrypted item
    const result = await reminderCollections.reminders?.insertOne(newReminder);
    if (result?.acknowledged) {
      res.status(201).send(`Created a new reminder: ID ${result.insertedId}`);
    } else {
      res.status(500).send("Failed to create new reminder.");
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// DELETE
reminderRouter.delete("/:id", requiresAuth(), async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const reminder = await reminderCollections.reminders?.findOne(query)
    const decryptedOwner = decrypt(reminder.owner);
    if (decryptedOwner == req.oidc.user.email) {
      const result = await reminderCollections.reminders?.deleteOne(query);
      if (result && result.deletedCount) {
        res.status(200).send(`Removed reminder: ID ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove reminder: ID ${id}`);
      } else {
        res.status(404).send(`failed to remove reminder: ID ${id}`);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});
