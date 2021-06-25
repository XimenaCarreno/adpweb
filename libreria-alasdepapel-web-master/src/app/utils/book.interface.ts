import { Category } from "./category.interface";

export interface Book {
    _id?: string;
    title: string;
    description: string;
    price: string;
    image: string;
    category: string;
}

export interface BookCategory {
    _id?: string;
    title: string;
    description: string;
    price: string;
    image?: string;
    category: Category;
}