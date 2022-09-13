import { Category } from "./category";
import { Review } from "./review";

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
    reviews?: Review[];
    isFeatured?: boolean;
    category?: Category;
    countInStock?: number;
    dateCreated?: Date;
}
