export class Cart {
    items?: CartItem[];
}

export class CartItem {
    productId?: any;
    quantity?: number;
}

export class CartItemDetailed {
    product?: any; 
    quantity?: any;
}