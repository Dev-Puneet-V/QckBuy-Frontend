    import {useContext, useState} from "react";
    import {  
        Typography,
        Rating,
        Box,
        DialogContent, 
        DialogTitle,
        Button,
        Stack
    } from "@mui/material";
    import { 
        KeyboardArrowDownOutlined,
        KeyboardArrowUpOutlined,
        CloseOutlined
    } from "@mui/icons-material";
    import { 
        styled 
    } from "@mui/system";
    import TextIcon, {PositionType} from '../../molecule/TextIcon';
    import Modal from '../../molecule/Modal';
    import Review from '../../molecule/Review';
import { updateCart } from "../../../hooks";
import { STATUS } from "../../../type";
import {useNavigate} from 'react-router-dom';
import { CartContext } from "../../../contexts/Cart";
    interface ProductInfoPropsType {
        id: String;
        name: String;
        description: String;
        ratings: number;
        numberOfReviews: number;
        reviews: [any];
        price: number;
        category: String;
        brand: String;
        quantity: number;
    }

    const StyledComponent = styled('div')({
        // width: '550px',
        // minHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyItems: 'top',
        alignItems: 'flex-start',
        margin: '5px',
        padding: '3px',
        position: 'relative'
    });


    const Component = (props: ProductInfoPropsType) => {
        let navigate = useNavigate();
        const cartContext = useContext(CartContext);
        let {
            id,
            name,
            description,
            ratings,
            numberOfReviews,
            reviews,
            price,
            category,
            brand,
            quantity
        } = props;
        const [cartUpdateStatus, setCartUpdateStatus] = useState<STATUS>(STATUS.NOT_STARTED);
        const [reviewBoxStatus, setReviewBoxStatus] = useState(false);
        return (
            <StyledComponent>
                <Typography variant="h4">
                    {name}
                </Typography>
                <Typography variant="subtitle2" >
                    <Stack direction="row"><b style={{width:'70px'}}>About : </b><Box sx={{maxWidth: '500px', width: '100%', height: 'auto', wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>{description}</Box></Stack>
                    <pre><b style={{width:'70px'}}>Brand : </b>{brand}</pre>
                    <pre><b style={{width:'70px'}}>Category : </b>{category}</pre>
                    <pre><b style={{
                        fontSize: '16px',
                        width:'70px'
                    }}>Rs : </b>{price}</pre> 
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                   {ratings !== 0 && <Rating name="read-only" value={ratings || 0} readOnly /> }
                    {
                        !reviewBoxStatus && ratings > 0 && <TextIcon
                            icon={
                                <KeyboardArrowDownOutlined 
                                    onClick={
                                        () => {
                                            setReviewBoxStatus(true);
                                        }
                                    }  
                                />
                            } 
                            iconPosition={PositionType.Right}
                            text={numberOfReviews}              
                        />
                    }
                    {
                        reviewBoxStatus && <TextIcon
                            icon={
                                <KeyboardArrowUpOutlined 
                                    onClick={
                                        () => {
                                            setReviewBoxStatus(true);
                                        }
                                    }  
                                />
                            } 
                            iconPosition={PositionType.Right}
                            text={numberOfReviews}              
                        />
                    }
                </Box>
                
                <Box sx={{
                            padding: '5px 5px 5px 0px',
                            position: `${quantity > 0 && 'absolute'}`,
                            bottom: '-60px',
                        }}> 
                            <Button color={
                                    (cartUpdateStatus === STATUS.NOT_STARTED && 'secondary') ||
                                    (cartUpdateStatus === STATUS.PROCESSING && 'primary') ||
                                    (cartUpdateStatus === STATUS.FAILED && 'error') ||
                                    'success'
                                } 
                                variant="contained" 
                                disabled={quantity === 0 || cartUpdateStatus === STATUS.PROCESSING} 
                                onClick={async () => {
                                    setCartUpdateStatus(STATUS.PROCESSING);
                                    const cartStatus = await cartContext?.updateProductInCart(id, true);
                                    if(cartStatus) {
                                        setCartUpdateStatus(STATUS.SUCCESS);
                                        navigate('/cart');
                                    }else{
                                        setCartUpdateStatus(STATUS.FAILED);
                                    }
                                }}
                            >
                                {quantity > 0 && cartUpdateStatus === STATUS.NOT_STARTED && "Add to cart"}
                                {quantity > 0 && cartUpdateStatus === STATUS.SUCCESS && "Added to cart"}
                                {quantity > 0 && cartUpdateStatus === STATUS.FAILED && "Failure in adding to cart"}
                                {quantity > 0 && cartUpdateStatus === STATUS.PROCESSING && "Processing your cart..."}
                                {quantity === 0 && "Out of stock"}
                            </Button>
                            
                        </Box>
                <Modal 
                        open={reviewBoxStatus}
                        handleClose={() => {
                            setReviewBoxStatus(false)
                        }} 
        >
                <>
                <DialogTitle 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '5px',
                        alignItems: 'center',
                        boxShadow: '1px 1px 4px -1px rgba(0,0,0,0.75)'
                    }} 
                >
                    <Typography variant="h4">
                        Reviews
                    </Typography>
                    <CloseOutlined 
                        onClick={() => {
                            setReviewBoxStatus(false)
                        }}
                    />          
                </DialogTitle>
                <DialogContent>
                    {
                        reviews?.map((review: any) => {
                                return ( <Review 
                                    review={review.comment} 
                                    rating={review.rating} 
                                    name={review.name} 
                                />)
                        })
                    }
                </DialogContent>
                </>  
            </Modal>
            </StyledComponent>
        )
    }

    export default Component;