export default interface Item {
    item?:string;
    store?:"Jewel Osco" | "Petes" | "Online" | "Aldi";
    inStock?:number;
    frequency?:string;
    _id?:string;
    editing?:boolean;
}