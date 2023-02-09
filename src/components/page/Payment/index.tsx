import {useState, useEffect, useRef} from "react";
import {  
    Button, Typography
} from "@mui/material";
import { 
    EnhancedEncryptionOutlined,
    GppBadOutlined,
    DoneAllOutlined,
    RunningWithErrorsOutlined,
    Replay,
    CurrencyRupee,
    FileDownload,
    MailOutlineOutlined
} from "@mui/icons-material";
import fileDownload from '../../../fileDownload';
import { 
    Box, 
    styled 
} from "@mui/system";
import {Elements, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import TextIcon, {PositionType} from '../../molecule/TextIcon';
import Receipt from '../../molecule/Receipt';
import { request } from "../../../hooks";
import { REQUEST_TYPE } from "../../../type";
interface PaymentPropsType {

}

const StyledComponent = styled('div')({
});

enum PAYMENT_STATUS {
    SUCCESS,
    FAILED,
    PAY_NOW,
    PROCESSING,
    RETRY,
    NOT_READY
}

const CheckoutForm = (props: any) => {
    const printRef = useRef();
    const {
        paymentStatus, 
        setPaymentStatus,
        cost,
        products,
    } = props
    const stripe = useStripe();
    const elements = useElements();
    // if(stripe && elements){
        // setPaymentStatus(PAYMENT_STATUS.PAY_NOW)
    // }
    const [invoiceUrl, setInvoiceUrl] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const invoiceDownloadHandler = async () => {
        console.log("Entered")
        if(invoiceUrl.length > 0){
            fileDownload(invoiceUrl, "Invoice.pdf");
            return;
        }
        console.log("First notd found")
        const invoice = await request(
            REQUEST_TYPE.GET, 
            `http://localhost:4000/api/v1/order/${paymentId}/invoice/true`, 
            ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGRkOTZiMjQxNmIxOWJlMWVkYmVjNCIsImlhdCI6MTY3NTkzOTc0MiwiZXhwIjoxNjc2MDI2MTQyfQ.Hmzk6kN8KFbaayNMkl7RPfNHXrqo2T5cu12sBVidWFY'
        );
        console.log(invoice)
        console.log("responsed")
        if(invoice.status){
            console.log("Trying to download")   
            setInvoiceUrl(invoice.url);
            fileDownload(invoiceUrl, "Invoice.pdf");
        }
    };
  const handleSubmit = async (event: any) => {
    setPaymentStatus(PAYMENT_STATUS.PROCESSING);
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    
    if (!stripe || !elements) {
        console.log('Something is not loaded');
        return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required' 
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      if(result.error.type !== 'validation_error'){
        setPaymentStatus(PAYMENT_STATUS.FAILED); 
      }else{
        console.log("Error")
        setPaymentStatus(PAYMENT_STATUS.RETRY)
      }
    } else {
        if(result?.paymentIntent?.status === "succeeded"){
            const postPaymentResponse = await fetch(`http://localhost:4000/api/v1/payment/stripe/paymentSuccess/${props.paymentIntentToken}`, {
                // method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_USER_TOKEN}`
                },
            });
            const postPaymentData = await postPaymentResponse.json();
            if(postPaymentData.success) {
                setPaymentStatus(PAYMENT_STATUS.SUCCESS);
                setPaymentId(postPaymentData.paymentId);
            }
        }else{
            const postPaymentResponse = await fetch(`http://localhost:4000/api/v1/payment/stripe/paymentFailure/${props.paymentIntentToken}`, {
                // method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_USER_TOKEN}`
                },
            });
            const postPaymentData = await postPaymentResponse.json();
            if(postPaymentData.success) {
                setPaymentStatus(PAYMENT_STATUS.FAILED);                
            }
        }
    }
  };
    return (
      <form onSubmit={handleSubmit}>
        {
            !(paymentStatus === PAYMENT_STATUS.SUCCESS) &&
            <PaymentElement />
        }
        {
            (paymentStatus === PAYMENT_STATUS.SUCCESS) && 
            <Receipt products={products} ref={printRef}/>
        }
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Button 
                disabled={!(stripe && elements && !(paymentStatus === PAYMENT_STATUS.SUCCESS || paymentStatus === PAYMENT_STATUS.PROCESSING))} 
                startIcon={
                    (paymentStatus === PAYMENT_STATUS.PROCESSING && <RunningWithErrorsOutlined sx={{
                        animation: 'rotation 2s infinite linear',
                        '@keyframes rotation': {
                            'from': {
                            transform: 'rotate(0deg)'
                            },
                            'to': {
                            transform: 'rotate(359deg)'
                            }
                        }
                    }}/> ) ||
                    (paymentStatus === PAYMENT_STATUS.PAY_NOW && <EnhancedEncryptionOutlined /> ) ||
                    (paymentStatus === PAYMENT_STATUS.RETRY && <Replay /> ) ||
                    (paymentStatus === PAYMENT_STATUS.FAILED && <GppBadOutlined />) ||
                    (paymentStatus === PAYMENT_STATUS.SUCCESS && <DoneAllOutlined />)
                } 
                variant="contained" 
                color={
                    (paymentStatus === PAYMENT_STATUS.RETRY && "secondary") ||
                    (paymentStatus === PAYMENT_STATUS.FAILED && "error") ||
                    (paymentStatus === PAYMENT_STATUS.SUCCESS && "success") ||
                    "primary"
                }
                sx={{
                    textAlign: 'left', 
                    marginTop: '10px'
                }}
            >
                <button 
                    disabled={!(stripe && elements && !(paymentStatus === PAYMENT_STATUS.SUCCESS || paymentStatus === PAYMENT_STATUS.PROCESSING))} 
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {
                        (paymentStatus === PAYMENT_STATUS.PROCESSING && "Processing") || 
                    (paymentStatus === PAYMENT_STATUS.PAY_NOW && (
                        <Box sx={{display: 'flex'}}>
                            <CurrencyRupee sx={{fontWeight: 'bold'}}/> 
                            <Typography>{cost / 100}</Typography> 
                            <Typography sx={{marginLeft: '15px'}}><b>Payment</b></Typography>
                        </Box>
                    )) ||
                    (paymentStatus === PAYMENT_STATUS.RETRY && "Retry_Payment") ||
                        (paymentStatus === PAYMENT_STATUS.FAILED && "Payment_Failed") ||
                        (paymentStatus === PAYMENT_STATUS.SUCCESS && "Payment_Successfull")
                    }
                </button>  
            </Button>
            {   paymentStatus === PAYMENT_STATUS.SUCCESS &&
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '5px'
                    }}
                >
                    <Button 
                    color="primary" 
                     sx={{marginRight: '5px', borderBottom: '1px solid lightGrey'}}
                     onClick={invoiceDownloadHandler}
                     disabled={paymentStatus !== PAYMENT_STATUS.SUCCESS}
                     >
                    <TextIcon 
                        icon={<FileDownload/>} 
                        iconPosition={PositionType.Left} 
                        text="Download Invoice" 
                        sx={{
                            textTransform: 'none', 
                            fontWeight: 'bold'
                        }}/>
                    </Button>
                    <Button 
                        color="primary" 
                        sx={{borderBottom: '1px solid lightGrey'}} 
                        disabled={(paymentStatus !== PAYMENT_STATUS.SUCCESS)}
                    >
                    <TextIcon 
                        icon={<MailOutlineOutlined />} 
                        iconPosition={PositionType.Left} 
                        text="Email Invoice" 
                        sx={{
                            textTransform: 'none', 
                            fontWeight: 'bold', 
                            marginLeft: '5px'
                        }}/>
                    </Button>
                </Box>
            }
        </Box>
        
        {/* <Button variant="contained" color="success"  sx={{textAlign: 'left', marginTop: '10px'}} disabled={!stripe}>
            Pay now
        </Button> */}
      </form>
    );
  };

const Component = (props: any) => {
    const [paymentIntent, setPaymentIntent] = useState<any>(undefined)
    const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.PAY_NOW);
    const stripePromise = loadStripe('pk_test_51KZBqmSCKnbKzuc35ilsGw3OGk1dmrm17gEcdsE0MLzcWwas0uDWelAWqHZa7yqBvuDzznznl584Pibq9KEmOcMw00p62JM0f1');
    useEffect(() => { 
        const processor = async () => {
            const paymentIntentResponse = await fetch("http://localhost:4000/api/v1/payment/stripe/initiatePayment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_USER_TOKEN}`
                },
            });
            const paymentIntent = await paymentIntentResponse.json();
            setPaymentIntent(paymentIntent);
        }
        if(paymentStatus === PAYMENT_STATUS.FAILED || paymentStatus === PAYMENT_STATUS.PAY_NOW){
            processor();
        }
    }, [paymentStatus]);
    const options = {
        clientSecret: paymentIntent?.clientSecret
    };
    return (
        <StyledComponent>
            {
                paymentIntent 
                && 
                <Box sx={{
                    padding: '10px',
                    // maxWidth: '500px'
                }}>
                {
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm paymentIntentToken={paymentIntent.paymentIntentIdToken} paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus} cost={paymentIntent?.cost} products={props.cart}/>
                    </Elements>
                }
                </Box>
            }
            
        </StyledComponent>
    )
}

export default Component;