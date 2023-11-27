import * as mongodb from "mongodb"

export default interface Reminder {
    _id?:mongodb.ObjectId;
    title?:string;
    description?:string;
}