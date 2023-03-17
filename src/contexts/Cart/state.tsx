import * as React from 'react';
import CartContext from './context';
import {
    request,
    REQUEST_TYPE
} from '../../hooks';
import { useCookies } from 'react-cookie';
import bigPromise from '../../bigPromise';

const CartState = (props: any) => {
    const [cookies] = useCookies(['token']);
    const [cart, setCart] = React.useState<any[]>([]);
    const [totalCost, setTotalCost] = React.useState<number>(0);
    const [totalQuantity, setTotalQuantity] = React.useState<number>(0);
    
    const updateCartData: Function = () => {
        request(REQUEST_TYPE.GET, `https://qckbuy-production.up.railway.app/api/v1/user/cart`, cookies.token).then(data => {
            if(data?.success){
                setCart(data.cartItems);
            }
        });  
    }

    React.useEffect(() => {
        if(cookies.token){
            updateCartData();
        }else{
            setCart([]);
        }
    }, [cookies.token]);
    React.useEffect(() => {
        const {
            updatedCost,
            updatedQuantity
        } = totalCartValues();
        setTotalCost(updatedCost);
        setTotalQuantity(updatedQuantity)
    }, [cart]);
    const updateProductInCart: Function = bigPromise(async (productId: string, toIncrement: boolean) => {
        try{
            const data = await request(
                toIncrement ? REQUEST_TYPE.POST : REQUEST_TYPE.PATCH, 
                `https://qckbuy-production.up.railway.app/api/v1/user/cart/${productId}`, 
                cookies.token
            );
            if(data?.success){
                let itemExists = false;
                for (let i = 0; i < cart.length; i++) {
                    const item = cart[i];
                    if (item.product?._id === productId) {
                        if (toIncrement) {
                            item.quantity++;
                        } else {
                            if (item.quantity === 0) {
                                throw new Error('Product out of range');
                            }
                            item.quantity--;
                        }
                        itemExists = true;
                        break;
                    }
                }
                if (!itemExists) {
                    setCart([...data.cartItems]);
                } else {
                setCart([...cart]);
            }
                return true;
            }else{
                throw new Error(`Problem  ${toIncrement ? 'incrementing' : 'decrementing'} product from cart`);
            }
        }catch(error: any){
            console.error(error.message);
            return false;
        }
    });

    const totalCartValues = () => {
        if(!cart || cart.length === 0){
            return {
                updatedCost: 0, 
                updatedQuantity: 0
            };
        }
        const updatedValues = cart?.reduce(
            (accumulator: {updatedCost: number, updatedQuantity: number}, currentValue: any) => {
                return {
                    updatedCost: accumulator.updatedCost + currentValue?.quantity * currentValue?.product.price,
                    updatedQuantity: accumulator.updatedQuantity + currentValue?.quantity
                }
            },
            {updatedQuantity: 0, updatedCost: 0}
        );
        return updatedValues;
    }
    

    const deleteCart = async () => {
        try{
            const data = await request(
                REQUEST_TYPE.DELETE, 
                `https://qckbuy-production.up.railway.app/api/v1/user/cart`,
                cookies.token
            );
            if(data?.success){
                setCart([]);
            }else{
                console.error("Error in deletion")
                throw new Error('Error in deletion of cart');
            }
        }catch(error: any){
            console.log(error.message);
            return false;
        }
    };
    return (
        <CartContext.Provider value={{cart, updateCartData, setCart, updateProductInCart, deleteCart, totalCost, totalQuantity}}>
            {props.children}
        </CartContext.Provider>
    )
} 


export default CartState;