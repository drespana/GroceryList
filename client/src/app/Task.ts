export default interface Task {
    task?:string;
    frequency?:string;
    weekday?:string;
    description?:string;
    notes?:string;
    _id?:string;
    editing?:boolean;
    selected?:boolean;
}