import {useState, useEffect} from "react";
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
import { updateCart, REQUEST_TYPE, deleteCart } from "../../../hooks";
import { STATUS } from "../../../type";
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
    const {
        setCart
    } = props;
    const [payment, setPayment] = useState(false);
    const [cartDeletionStatus, setCartDeletionStatus] = useState<STATUS>(STATUS.NOT_STARTED);
    const navigate = useNavigate();
    useEffect(() =>{
        const processor = async () => {
            let response = await fetch(`http://localhost:4000/api/v1/user/cart`, {
              headers: {Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`}
            });
            let data = await response.json();
            console.log(data)
            setCart(data.cartItems);
        }
        processor();
      }, []);
    let totalCost = () => {
        const cost = props.cart.reduce(
            (accumulator: number, currentValue: any) => accumulator + currentValue?.quantity * currentValue?.product.price,
            0
        );
        return cost;
    }
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
                    width: '50%'
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
                <pre><b>Total cost (in Rs) : </b> {totalCost()}</pre>
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
                        const deleteStatus = await deleteCart("a", "b", "c");
                        console.log(deleteStatus)
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