import React, {createContext} from 'react';

type CartContextType = {
    cart: any[];
    updateCartData: Function;
    updateProductInCart: Function;
    deleteCart: Function;
    setCart: React.Dispatch<any>;    
    totalCost: number;
    totalQuantity: number;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export default CartContext;