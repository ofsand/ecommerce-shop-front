import { Category } from "./category";

export class Product {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    rating?: number;
    price?: number;
    numReviews?: number;
    isFeatured?: boolean;
    category?: Category;
    countInStock?: number;
    dateCreated?: Date;
}
