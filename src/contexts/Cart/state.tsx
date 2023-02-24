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
    
    
    const updateCartData: Function = () => {
        request(REQUEST_TYPE.GET, `http://localhost:4000/api/v1/user/cart`, cookies.token).then(data => {
            if(data.success){
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
        setTotalCost(totalCartCost());
    }, [cart]);
    const updateProductInCart: Function = bigPromise(async (productId: string, toIncrement: boolean) => {
        try{
            const data = await request(
                toIncrement ? REQUEST_TYPE.POST : REQUEST_TYPE.PATCH, 
                `http://localhost:4000/api/v1/user/cart/${productId}`, 
                cookies.token
            );
            if(data.success){
                let exists = false;
                setCart((prevCartItems: any) => {
                    return prevCartItems?.map((item: any) => {
                        if(item.quantity === 0 && !toIncrement){
                            throw new Error('Product out of range')
                        }
                    if (item._id === productId) {
                        exists = true;
                        setTotalCost(toIncrement ? (totalCost + item.price) : (totalCost - item.price));
                        return {
                            ...item,
                            quantity: !toIncrement ? item.quantity - 1 : item.quantity + 1
                        };
                    }
                    return item;
                    });
                    
                });
                
                if(!exists){
                    let newData = [{
                        "product": data.cartItems[0].product,
                        "quantity": 1
                    }]
                    setCart(newData)
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

    const totalCartCost = () => {
        if(!cart || cart.length === 0){
            return 0;
        }
        cart.map(currentValue => {
            console.log(currentValue?.quantity, currentValue?.product.price)
        })
        const cost = cart?.reduce(
            (accumulator: number, currentValue: any) => accumulator + currentValue?.quantity * currentValue?.product.price,
            0
        );
        console.log(cost, "cost")
        return cost;
    }
    

    const deleteCart = async () => {
        try{
            const data = await request(
                REQUEST_TYPE.DELETE, 
                `http://localhost:4000/api/v1/user/cart`,
                cookies.token
            );
            if(data.success){
                setCart([]);
            }else{
                throw new Error('Error in deletion of cart');
            }
        }catch(error: any){
            console.log(error.message);
            return false;
        }
    };
    return (
        <CartContext.Provider value={{cart, updateCartData, setCart, updateProductInCart, deleteCart, totalCost}}>
            {props.children}
        </CartContext.Provider>
    )
} 


export default CartState;