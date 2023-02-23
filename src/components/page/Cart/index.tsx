import {useState, useEffect, useContext} from "react";
import { 
    Box,
    Typography,
    Button
} from "@mui/material";
import { 
    DeleteOutlineOutlined,
    ShoppingCartCheckoutOutlined
} from "@mui/icons-material";
import { 
    styled 
} from "@mui/system";
import TextIcon, {PositionType} from '../../molecule/TextIcon';
import CartItem from '../../molecule/CartItem';
import Modal from '../../molecule/Modal';
import {useNavigate} from 'react-router-dom';
import { updateCart, REQUEST_TYPE, deleteCart, request } from "../../../hooks";
import { STATUS } from "../../../type";
import { useCookies } from "react-cookie";
import { CartContext } from "../../../contexts/Cart";
interface CartPropsType {

}

const StyledComponent = styled('div')({
    height: 'calc(100vh-50px)',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '10px'
});


const Component = (props: any) => {
    const cartContext = useContext(CartContext);
    const [cartDeletionStatus, setCartDeletionStatus] = useState<STATUS>(STATUS.NOT_STARTED);
    const navigate = useNavigate();
    
    return (
        <StyledComponent>
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'end',
                    overyflowY: 'scroll',
                    width: '100%'
                }}
            >
            { 
                props.cart?.map((currCartItem: any) => {
                    return (<CartItem 
                        cartItem={currCartItem}
                    />)
                })
            }
            </Box>
            <Box
                sx={{
                    height: 'calc(100vh-52px)',
                    display: 'flex',
                    justifyContent: 'end',
                    width: '45%',
                    padding: '5px 20px',
                    flexDirection:'column'
                }}
            >
            <Typography variant="subtitle1">
                <pre><b>Total cost (in Rs) : </b> {cartContext?.totalCost}</pre>
            </Typography>
            <Box sx={{
                width: '510px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button 
                    variant="contained" 
                    color="success"  
                    sx={{textAlign: 'left', width: '250px'}}
                    onClick={() => {
                        navigate('/payment');
                    }}
                    disabled={cartDeletionStatus !== STATUS.NOT_STARTED}
                >
                    <TextIcon icon={<ShoppingCartCheckoutOutlined sx={{color: 'white'}} />} iconPosition={PositionType.Right} text='Checkout'/>
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={async () => {
                        setCartDeletionStatus(STATUS.PROCESSING);
                        const deleteStatus = cartContext?.deleteCart;
                        if(deleteStatus) {
                            setCartDeletionStatus(STATUS.SUCCESS);
                            navigate('/')
                        } else{
                            setCartDeletionStatus(STATUS.FAILED);
                        }
                    }}
                    disabled={cartDeletionStatus !== STATUS.NOT_STARTED}
                    sx={{
                        width: '250px'
                    }}
                >
                    <TextIcon 
                        icon={<DeleteOutlineOutlined 
                        sx={{color: 'white'}} />} 
                        iconPosition={PositionType.Right} 
                        text={
                            (cartDeletionStatus === STATUS.SUCCESS && "Cart deletion successfull") ||
                            (cartDeletionStatus === STATUS.FAILED && "Failure in deletion of cart") ||
                            (cartDeletionStatus === STATUS.PROCESSING && "Processing your cart...") ||
                            "Delete your cart"
                        } 
                    />
                </Button>
            </Box>
            </Box>
        </StyledComponent>
    )
}

export default Component;