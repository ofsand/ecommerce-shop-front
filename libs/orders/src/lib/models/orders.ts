import { OrderItem } from "./order-item";
import { User } from "@ecommerce-brands/products";

export class Order {
    id?: string;
    orderItems?: OrderItem[];
    shippingAddress?: string;
    city?: string;
    zipCode?: string;
    phone?: string;
    status?: string;
    totalPrice?: number;
    user?: User;
    dateOrdered?: Date;
}
