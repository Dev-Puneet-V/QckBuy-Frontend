import {useState} from "react";
import {  
    Box,
    Button,
    Typography
} from "@mui/material";
import { 
    AddOutlined,
    RemoveOutlined
} from "@mui/icons-material";
import { 
    styled 
} from "@mui/system";
import Image from '../../atom/Image';
import { updateCart } from "../../../hooks";
import { STATUS } from "../../../type";
interface CartItemPropsType {

}

const StyledComponent = styled('div')({
    width: '100%',
    margin: '5px auto',
    boxShadow: '1px 1px 4px 0px rgba(51,47,51,0.26)',
    padding: '5px'
});

const Component = (props: any) => {
    const [productCountInCart, setProductCountInCart] = useState(props.cartItem?.quantity);
    const [updateStatus, setCartUpdateStatus] = useState<STATUS>(STATUS.NOT_STARTED);
    const reduceFromCartHandler = async () => {
        setCartUpdateStatus(STATUS.PROCESSING);
        const status = await updateCart(false, props.cartItem?.product?._id, () => {});
        status && setProductCountInCart(productCountInCart - 1);
        setCartUpdateStatus(STATUS.NOT_STARTED);
    }
    
    const addToCartHandler = async () => {
        setCartUpdateStatus(STATUS.PROCESSING);
        const status = await updateCart(true, props.cartItem?.product?._id, () => {});
        status && setProductCountInCart(productCountInCart + 1);
        setCartUpdateStatus(STATUS.NOT_STARTED);
    }
    return (
        <StyledComponent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '50px',
                    marginBottom: '5px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        src={props.cartItem?.product?.photos[0]?.secure_url}
                        height='50px'
                        width='50px'
                        sx={{
                            marginRight: '5px'
                        }}
                    />
                    <Typography>
                        {props.cartItem?.product?.name}
                    </Typography>
                </Box>
                
                <Box sx={{
                    display: 'flex',
                    width: '160px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px'
                }}>
                    <Button 
                        onClick={reduceFromCartHandler} 
                        disabled={updateStatus === STATUS.PROCESSING} 
                        sx={{
                            border: 'none', 
                            // backgroundColor: 'transparent',
                            margin: '0px',
                            padding: '0px',
                            width: '10px',
                            // color: 'grey'
                        }}
                        variant="contained"
                        color="primary"
                    >
                        <RemoveOutlined/>
                    </Button>
                    <Typography 
                        variant="subtitle1"
                        sx={{
                            boxShadow: '1px 1px 4px 0px rgba(51,47,51,0.26)',
                            height: '30px',
                            width: '70px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0px 5px',
                            margin: '0px 5px'
                        }}
                    >
                        {productCountInCart}
                    </Typography>
                    <Button 
                        onClick={addToCartHandler} 
                        disabled={updateStatus === STATUS.PROCESSING} 
                        sx={{
                            border: 'none', 
                            // backgroundColor: 'transparent',
                            margin: '0px',
                            padding: '0px',
                            width: '10px',
                            // color: 'grey'
                        }}
                        
                        variant="contained"
                        color="secondary"
                    >
                        <AddOutlined/>
                    </Button>
                </Box>
            </Box>
        </StyledComponent>
    )
}

export default Component;