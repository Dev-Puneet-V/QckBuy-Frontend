import {useState, useEffect, useRef, useContext} from "react";
import {  
    Button, CircularProgress, Stack, Typography, useMediaQuery, useTheme
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
import {Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import TextIcon, {PositionType} from '../../molecule/TextIcon';
import Receipt from '../../molecule/Receipt';
import { request } from "../../../hooks";
import { REQUEST_TYPE } from "../../../type";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/Cart";
interface PaymentPropsType {

}

const StyledComponent = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    width: '100vw'
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
    const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const cartContext = useContext(CartContext);
    //useRef will create a reference to cartContext?.context and will not change even if cart is rerendered due to value change
    const products = useRef(cartContext?.cart);
    const cookies = props.cookies;
    const printRef = useRef();
    const {
        paymentStatus, 
        setPaymentStatus,
        cost,
    } = props
    const stripe = useStripe();
    const elements = useElements();
    const [invoiceUrl, setInvoiceUrl] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const invoiceDownloadHandler = async () => {
        if(invoiceUrl.length > 0){
            fileDownload(invoiceUrl, "Invoice.pdf");
            return;
        }
        const invoice = await request(
            REQUEST_TYPE.GET, 
            `https://qckbuy-production.up.railway.app/api/v1/order/${paymentId}/invoice/true`, 
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
            
            const postPaymentResponse = await request(REQUEST_TYPE.GET, `https://qckbuy-production.up.railway.app/api/v1/payment/stripe/paymentSuccess/${props.paymentIntentToken}`, cookies.token);
            // const postPaymentData = await postPaymentResponse.json();
            if(postPaymentResponse.success) {
                cartContext?.deleteCart();
                setPaymentStatus(PAYMENT_STATUS.SUCCESS);
                setPaymentId(postPaymentResponse.paymentId);
            }
        }else{
            const postPaymentResponse = await request(REQUEST_TYPE.GET, `https://qckbuy-production.up.railway.app/api/v1/payment/stripe/paymentFailure/${props.paymentIntentToken}`, cookies.token);
            // const postPaymentData = await postPaymentResponse.json();
            if(postPaymentResponse.success) {
                setPaymentStatus(PAYMENT_STATUS.FAILED);                
            }
        }
    }
  };
    return (
      <form onSubmit={handleSubmit}>
        <Stack
            direction="column"
            spacing={1}
            justifyItems='center'
            alignContent='center'
            height={isMobileView ? 'calc(100vh - 70vw)': '600px'}
            width={isMobileView ? '100%': '400px'}
            sx={{
                padding: '13px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:' center',
                width: isMobileView ? '100vw' : (paymentStatus === PAYMENT_STATUS.SUCCESS ? '95%' : 'min-content'),
                boxShadow: '0 4px 6px rgb(0 0 0 / 10%), 0 1px 3px rgb(0 0 0 / 8%)',
                height: isMobileView ? '100vh' : 'min-content'
            }}
        >
        {<>
        {
            !(paymentStatus === PAYMENT_STATUS.SUCCESS) &&
            <PaymentElement/>
        }
        {
            (paymentStatus === PAYMENT_STATUS.SUCCESS) &&
                <Receipt products={products.current} ref={printRef}/>
        }
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isMobileView ? 'column': 'row'
        }}>
            <Button 
                disabled={!(stripe && elements && !(paymentStatus === PAYMENT_STATUS.SUCCESS || paymentStatus === PAYMENT_STATUS.PROCESSING))} 
                startIcon={
                    (paymentStatus === PAYMENT_STATUS.PROCESSING && <CircularProgress
                        size={30}
                        color="secondary"
                        // style={{ position: "absolute"}}
                      /> ) ||
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
                            <Typography>{(cartContext?.totalCost || 0)}</Typography> 
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
        
        </>}
        </Stack>
        {/* <Button variant="contained" color="success"  sx={{textAlign: 'left', marginTop: '10px'}} disabled={!stripe}>
            Pay now
        </Button> */}
      </form>
    );
  };

const Component = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const [paymentIntent, setPaymentIntent] = useState<any>(undefined)
    const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.PAY_NOW);
    const [retry, setRetry] = useState(0);
    const stripePromise = loadStripe('pk_test_51KZBqmSCKnbKzuc35ilsGw3OGk1dmrm17gEcdsE0MLzcWwas0uDWelAWqHZa7yqBvuDzznznl584Pibq9KEmOcMw00p62JM0f1');
    const [isLoading, setLoadingState] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            setLoadingState(false);
        }, 3000);
    }, []);
    useEffect(() => { 
        const processor = async () => {
            setRetry(retry + 1);
            const paymentIntentResponse = await request(REQUEST_TYPE.POST, "https://qckbuy-production.up.railway.app/api/v1/payment/stripe/initiatePayment", cookies.token);
            if(paymentIntentResponse.success){
                setPaymentIntent(paymentIntentResponse);
            }else{
                if(retry >= 3){
                    navigate('/cart');
                }else{
                    setPaymentStatus(PAYMENT_STATUS.FAILED);
                }
            }
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
            {isLoading && <CircularProgress
                        size={30}
                        color="secondary"
                        style={{ position: "absolute"}}
                      />}
            {

                !isLoading && paymentIntent 
                && 
                <Box sx={{
                    padding: '10px',
                    // maxWidth: '500px'
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100vw'
                }}>
                {
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm paymentIntentToken={paymentIntent.paymentIntentIdToken} paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus} cost={paymentIntent?.cost} cookies={cookies}/>
                    </Elements>
                }
                </Box>
            }
            
        </StyledComponent>
    )
}

export default Component;