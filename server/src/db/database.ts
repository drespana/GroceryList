import * as mongodb from "mongodb";
import Item from "../models/Item";

export const collections: {items?: mongodb.Collection<Item>} = {};

export async function connectToDatabase(uri:string) {
    const client = new mongodb.MongoClient(uri);

    await client.connect();

    const db = client.db("grocerydb");

    await applySchemaValidation(db);

    const groceryCollection = db.collection<Item>("grocerycollection");
    collections.items = groceryCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["item", "inStock", "frequency", "store"],
            additionalProperties: false,
            properties: {
                _id: {},
                item: {
                    bsonType: "string",
                    description: "'item' is required and is a string",
                },
                inStock: {
                    bsonType:"number",
                    description: "'inStock' is required and is either true or false",

                },
                frequency: {
                    bsonType: "string",
                    description: "'store' is required and is a string",
                    enum: ["One-Time Request", "Weekly","Monthly","Indefinite"]
                },
                store: {
                    bsonType: "string",
                    description: "'store' is required and is a string",
                    enum: ["Jewele Osco", "Pete's", "Online"]
                },
                
            },
        },
    };
  
    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "items",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("items", {validator: jsonSchema});
        }
    });
 }