import * as mongodb from "mongodb";

export default interface Item {
    id:string;
    item:string;
    store:"Jewel Osco" | "Pete's" | "Online";
    inStock:boolean;
    _id?:mongodb.ObjectId;
}