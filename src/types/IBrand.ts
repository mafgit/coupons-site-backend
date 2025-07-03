import { ICategory } from "./ICategory";

export interface IBrand {
    _id: string;
    name: string;
    category: ICategory;
    image: string;
    website: string;
    description: string;
    slug: string
}