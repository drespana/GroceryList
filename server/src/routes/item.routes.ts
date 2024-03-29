import * as express from "express";
import * as mongodb from "mongodb";
import { encrypt, decrypt } from "../util/encrypt";
import { collections } from "../db/database";
import Item from "../models/Item";
import { requiresAuth } from "express-openid-connect";

export const itemRouter = express.Router();
itemRouter.use(express.json());

// define type for encrypted data
type EncryptedData = {
  [key: string]: string | any;
};
type DecryptedData = {
  [key: string]: string | any;
};

// GET all items
itemRouter.get("/", requiresAuth(), async (_req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    res.status(200).send(decryptedItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET store Pete's Fresh Market
itemRouter.get("/petes-fresh-market", async (req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    const petesItems = decryptedItems.filter(
      (item) => item.store && item.store === "Pete's Fresh Market"
    );
    res.status(200).send(petesItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET store Jewel Osco
itemRouter.get("/jewel-osco", async (req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    const jewelItems = decryptedItems.filter(
      (item) => item.store && item.store === "Jewel Osco"
    );
    res.status(200).send(jewelItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET by store Aldi
itemRouter.get("/aldi", async (req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    const aldiItems = decryptedItems.filter(
      (item) => item.store && item.store === "Aldi"
    );
    res.status(200).send(aldiItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET by out of stock
itemRouter.get("/out-of-stock", async (req, res) => {
  try {
    const oosItems = await collections.items?.find({ inStock: 0 }).toArray();
    const decryptedItems: any[] = [];
    for (const item of oosItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    res.status(200).send(decryptedItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET store online
itemRouter.get("/online", async (req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    const onlineItems = decryptedItems.filter(
      (item) => item.store && item.store === "Online"
    );
    res.status(200).send(onlineItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

itemRouter.get("/indefinite", async (req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    const indefiniteItems = decryptedItems.filter(
      (item) => item.frequency && item.frequency === "Indefinite"
    );
    res.status(200).send(indefiniteItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

itemRouter.get("/weekly", async (req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    const weeklyItems = decryptedItems.filter(
      (item) => item.frequency && item.frequency === "Weekly"
    );
    res.status(200).send(weeklyItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

itemRouter.get("/monthly", async (req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    const monthlyItems = decryptedItems.filter(
      (item) => item.frequency && item.frequency === "Monthly"
    );
    res.status(200).send(monthlyItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

itemRouter.get("/one-time-request", async (req, res) => {
  try {
    const allItems = await collections.items?.find().toArray();
    const decryptedItems: any[] = [];
    for (const item of allItems) {
      const decryptedItem: DecryptedData = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
          try {
            const decryptedValue = await decrypt(value);
            decryptedItem[key] = decryptedValue;
          } catch (err) {
            console.error("Error decrypting: " + err.message);
          }
        } else {
          decryptedItem[key] = value;
        }
      }
      decryptedItems.push(decryptedItem);
    }
    const oneTimeItems = decryptedItems.filter(
      (item) => item.frequency && item.frequency === "One-Time Request"
    );
    res.status(200).send(oneTimeItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET item by id
itemRouter.get("/:id", requiresAuth(), async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const item = await collections.items?.findOne(query);
    const decrypted: DecryptedData = {};

    for (const [key, value] of Object.entries(item)) {
      try {
        if (typeof value === "string") {
          const decryptedValue = await decrypt(value);
          decrypted[key] = decryptedValue;
        } else {
          decrypted[key] = value;
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (item) {
      res.status(200).send(decrypted);
    } else {
      res.status(404).send(`Failed to find an item: ID: ${id}`);
    }
  } catch (err) {
    res.status(404).send(`Failed to find Item: ID ${req?.params?.id}`);
  }
});

// POST item to db
itemRouter.post("/", requiresAuth(), async (req, res) => {
  try {
    const item = req.body;
    const encrypted: EncryptedData = {};

    for (const [key, value] of Object.entries(item)) {
      if (typeof value === "string") {
        encrypted[key] = encrypt(value);
      } else {
        encrypted[key] = value;
      }
    }

    // set item info
    const newItem = {
      _id: item._id,
      owner: encrypt(req.oidc.user.email),
      ...encrypted,
    };

    // insert encrypted item
    const result = await collections.items?.insertOne(newItem);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new item: ID ${result.insertedId}`);
    } else {
      res.status(500).send("Failed to create new item.");
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// PUT by id
itemRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const item = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const encrypted: EncryptedData = {};

    for (const [key, value] of Object.entries(item)) {
      if (typeof value === "string") {
        encrypted[key] = encrypt(value);
      } else {
        encrypted[key] = value;
      }
    }

    // set item info
    const newItem = {
      _id: item._id,
      owner: encrypt(req.oidc.user.email),
      ...encrypted,
    };

    const result = await collections.items?.updateOne(query, { $set: newItem });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated item: ID ${id}`);
    } else if (!result?.matchedCount) {
      res.status(304).send(`Failed to update: ID ${id}`);
    } else {
      res.status(304).send(`failed to update: ID ${id}`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// DELETE
itemRouter.delete("/:id", requiresAuth(), async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const item = await collections.items?.findOne(query);

    const decryptedOwner = await decrypt(item.owner);
    // check if the logged in user matches the value
    if (decryptedOwner == req.oidc.user.email) {
      const result = await collections.items?.deleteOne(query);
      if (result && result.deletedCount) {
        res.status(200).send(`Removed item: ID ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove item: ID ${id}`);
      } else {
        res.status(404).send(`failed to remove item: ID ${id}`);
      }
    } else {
      throw { err: "Permission Denied." };
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});
