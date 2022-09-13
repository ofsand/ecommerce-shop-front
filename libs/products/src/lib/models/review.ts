/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { User } from "@ecommerce-brands/users";
import { Product } from "./product";

export class Review {
    id?: string;
    reviewer?: string;
    rating?: number;
    text?: string;
    product?: Product;
    user?: User
    created_on?: Date
}