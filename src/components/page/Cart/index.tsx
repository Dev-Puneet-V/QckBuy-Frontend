import {useState, useEffect, useContext} from "react";
import { 
    Box,
    Typography,
    Button,
    useTheme,
    useMediaQuery
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
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const cartContext = useContext(CartContext);
    const [cartDeletionStatus, setCartDeletionStatus] = useState<STATUS>(STATUS.NOT_STARTED);
    const navigate = useNavigate();
    console.log("checking", props.cart)
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
                    width: '90vw'
                }}
            >
            { 
                cartContext?.cart?.map((currCartItem: any) => {
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
                    width: '94vw',
                    flexDirection:'column'
                }}
            >
            <Typography variant="subtitle1">
                <pre><b>Total cost (in Rs) : </b> {cartContext?.totalCost}</pre>
            </Typography>
            <Box sx={{
                width: isMobileView ? '94vw' : '500px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button 
                    variant="contained" 
                    color="success"  
                    sx={{textAlign: 'left', width: '49%'}}
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
                        const deleteStatus = cartContext?.deleteCart();
                        if(deleteStatus) {
                            setCartDeletionStatus(STATUS.SUCCESS);
                            navigate('/')
                        } else{
                            setCartDeletionStatus(STATUS.FAILED);
                        }
                    }}
                    disabled={cartDeletionStatus !== STATUS.NOT_STARTED}
                    sx={{
                        width: '49%'
                    }}
                >
                    <TextIcon 
                        icon={<DeleteOutlineOutlined 
                        sx={{color: 'white'}} />} 
                        iconPosition={PositionType.Right} 
                        text={
                            (cartDeletionStatus === STATUS.SUCCESS && "Success") ||
                            (cartDeletionStatus === STATUS.FAILED && "Failed") ||
                            (cartDeletionStatus === STATUS.PROCESSING &&  "Processing") ||
                            "Empty"
                        } 
                    />
                </Button>
            </Box>
            </Box>
        </StyledComponent>
    )
}

export default Component;