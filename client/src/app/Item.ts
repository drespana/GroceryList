export default interface Item {
    item?:string;
    store?:"Jewel Osco" | "Pete's" | "Online";
    inStock?:number;
    frequency?:string;
    _id?:string;
}