import { Comments } from "./comments";

export class Books{
    _id: number;
    name: string;
    author: string;
    synopsis: string;
    comments: Comments [];
}