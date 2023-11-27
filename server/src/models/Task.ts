import * as mongodb from "mongodb"

export default interface Task {
    _id?:mongodb.ObjectId;
    task?:string;
    frequency?:string;
    weekday?:string;
    description?:string;
    notes?:string;
}