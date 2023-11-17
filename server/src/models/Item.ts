import * as mongodb from "mongodb";

export default interface Item {
    item?:string;
    inStock?:number;
    frequency?: "One-Time Request" | "Weekly" | "Monthly" | "Indefinite";
    store?: "Aldi" | "Jewel Osco" | "Pete's Fresh Market" | "Online";
    _id?:mongodb.ObjectId;
}