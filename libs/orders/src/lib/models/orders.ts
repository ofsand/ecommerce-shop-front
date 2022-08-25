import { OrderItem } from "@ecommerce-brands/orders";
import { User } from "@ecommerce-brands/products";

export class Order {
    orderItem?: OrderItem;
    shippingAddress?: string;
    city?: string;
    zipCode?: string;
    phone?: string;
    status?: string;
    totalPrice?: number;
    user?: User;
    dateOrdered?: Date;
}
