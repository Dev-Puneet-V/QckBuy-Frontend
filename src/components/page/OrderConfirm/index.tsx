import {useState, useEffect} from "react";
import {  
    Button
} from "@mui/material";
import { 
    Box, 
    styled 
} from "@mui/system";

import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
interface ProductPropsType {

}

const StyledComponent = styled('div')({
});

enum PostPaymentStatus {
    DONE,
    FAILED,
    PROCESSING
}

const Component = (props: any) => {
    const confirmHandler = () => {

    }
    const [paymentStatus, setPaymentStatus] = useState(PostPaymentStatus.PROCESSING)
    const [searchParams, setSearchParams] = useSearchParams();
    const redirectStatus = searchParams.get('redirect_status');
    const paymentIntentId = searchParams.get('payment_intent');
    useEffect(() => {
        const processor = async () => {
            if(redirectStatus === 'succeeded'){
                let response = await fetch(`http://localhost:4000/api/v1/payment/stripe/paymentSuccess/${paymentIntentId}`, {
                headers: {Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`}
                });
                let data = await response.json();
                if(data.success){
                    setPaymentStatus(PostPaymentStatus.DONE);
                }else{
                    setPaymentStatus(PostPaymentStatus.FAILED);
                }
            }else{

            }    
        }
        
        processor();
    }, [])
    return (
        <StyledComponent>
            <Button variant="contained" color="success"  sx={{textAlign: 'left', marginTop: '10px'}} onClick={confirmHandler}>
                {paymentStatus}
            </Button>
        </StyledComponent>
    )
}

export default Component;