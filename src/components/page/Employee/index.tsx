import * as React from 'react';
import { VictoryPie, VictoryChart, VictoryLine} from 'victory';
import TableContainer from '../../molecule/TableContainer';
import Dashboard from '../../organism/Dashboard';
import {  
    Button, Box, Card, Typography, TextField, InputAdornment
} from "@mui/material";
import { CloseOutlined, AccountCircleOutlined, DomainVerificationOutlined, EventAvailableOutlined, HistoryOutlined } from "@mui/icons-material";
import moment from 'moment/moment.js';
import { REQUEST_TYPE, request, isNumeric,} from '../../../hooks';
import { TablePropsType } from '../../molecule/Table';
import Modal from '../../molecule/Modal';
import { STATUS } from '../../../type';
const Component = (props: any) => {
  const [historyData, setHistoryData] = React.useState<TablePropsType>({"columns" : [{"name" : "Items"}], "rows": [[{"value": "No items exists"}]]});
  const [availableOrdersData, setAvailableOrdersData] = React.useState<TablePropsType>({"columns" : [{"name" : "Items"}], "rows": [[{"value": "No items exists"}]]});
  const [acceptedOrdersData, setAcceptedOrdersData] = React.useState<TablePropsType>({"columns" : [{"name" : "Items"}], "rows": [[{"value": "No items exists"}]]});
  const [otpModalVerificationState, setOtpModalVerificationState] = React.useState<boolean>(false);
  const [otp, setOtp] = React.useState<string>("");
  const [otpVerifcationState, setOtpVerficationState] = React.useState<STATUS>(STATUS.NOT_STARTED);
//   const []
  const otpFieldRef = React.useRef<any>();
  const [orderId, setOrderId] = React.useState<string | undefined>();
  otpFieldRef.current = { value: '' };
  const getData = async (url: string, index: number) => {
    const data = await request(REQUEST_TYPE.GET, url, process.env.REACT_APP_EMPLOYEE_TOKEN)
    if(data.success && data?.data && data?.data?.length > 0){
        let columns: TablePropsType["columns"] = [];
        Object.keys(data?.data[0]).forEach((key: string) => {
            if(key === '_id'){
                key = 'order_id';
            }else if(key === 'updatedAt'){
                if(index === 2){
                    key = 'order_acceptance_date'
                }
                if(index === 3){
                    key = 'order_delivery_date'
                }
            }
            columns.push({
                'name': key
            });
        });
        const rows = data?.data?.map((currData: any, currIndex: number) => {
            let currRow: TablePropsType["rows"][0] = [];
            Object.keys(currData).forEach((key: any) => {
                if(key.toString() === "createdAt" || key.toString() === "updatedAt"){
                    currData[key] = moment(currData[key]).format("MMMM Do YYYY")
                }
                currRow.push({
                    'value': currData[key]
                });
            });
            if(index === 1){
                currRow.push({
                    'value': <Button variant="contained" color="secondary" onClick={() => { orderAcceptHandler(currData._id, currRow)}}>
                                accept_order
                            </Button>
                })
            }
            if(index === 2){
                currRow.push({
                    'value': <Button variant="contained" color="secondary" onClick={
                        () => deliveryHandler(currData._id, currRow)
                    }>
                                proceed_for_delivery
                            </Button>
                })
            }
            return currRow;
        });
        const newData = {
            columns: columns,
            rows: rows
        };
        if(index === 1){
            columns.push({
                'name': ''
            });
            setAvailableOrdersData(newData) ;  
        }
        if(index === 2){
            columns.push({
                'name': ''
            });
            setAcceptedOrdersData(newData); 
        }
        if(index === 3){
            setHistoryData(newData);   
        }
    }
}
const orderAcceptHandler = async (orderId: string, currRow: any) => {
    const data = await request(
        REQUEST_TYPE.POST,
        `http://localhost:4000/api/v1/order/accept/${orderId}`,
        process.env.REACT_APP_EMPLOYEE_TOKEN
    )
    if(data.success){
        setAvailableOrdersData(prevAvailableOrdersData => {
            console.log(prevAvailableOrdersData)
            let newRowList = [...prevAvailableOrdersData.rows].filter((row: any) => {
                return row[0].value !== currRow[0].value
            })
            const newData ={
                columns: prevAvailableOrdersData.columns,
                rows: [...newRowList]
            };
            return newData;
        });
    }
}

const deliveryHandler = async (orderId: string,currRow: any) => {
    const data = await request(
        REQUEST_TYPE.GET,
        `http://localhost:4000/api/v1/order/delivery/initiate/${orderId}`,
        process.env.REACT_APP_EMPLOYEE_TOKEN
    );
    if(data.success){
        setOrderId(orderId);
        setOtpModalVerificationState(true);
    }
}

    const ProfileComponent = (params: any) => {
        return <>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                 <Card sx={{height : '300px', w: '300px', m: 5}}>
                <VictoryPie
                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                    data={[
                    { x: "1 Star", y: 5 },
                    { x: "2 Star", y: 15 },
                    { x: "3 Star", y: 35 },
                    { x: "4 Star", y: 5 },
                    { x: "5 Star", y: 40 }
                    ]}
                />
                </Card>
                <Card sx={{height : '300px', w: '300px', m: 5, backgroundColor: '#fff'}}>
                <VictoryChart
                    >
                    <VictoryLine
                        style={{
                        data: { stroke: 'lightgrey' },
                        parent: { border: "0.1px solid black"}
                        }}
                        data={[
                        { x: 1, y: 1 },
                        { x: 2, y: 1.5 },
                        { x: 3, y: 2 },
                        { x: 4, y: 2.5 },
                        { x: 5, y: 3 },
                        { x: 6, y: 4 },
                        { x: 7, y: 5 },
                        { x: 8, y: 6 },
                        { x: 9, y: 7 },
                        { x: 10, y: 8 },
                        { x: 11, y: 9 },
                        { x: 12, y: 10 },
                        { x: 13, y: 12 },
                        { x: 14, y: 13 },
                        { x: 15, y: 14 },
                        { x: 16, y: 15 },
                        { x: 17, y: 16 },
                        { x: 18, y: 17 },
                        { x: 19, y: 18 },
                        { x: 20, y: 19 }
                        ]}
                    />
                    </VictoryChart>
                </Card>
            </Box>
        </>        
    }
    const AvailableOrdersComponent = (profileProps: any) => {
        return <>
            {availableOrdersData &&  <TableContainer columns={availableOrdersData?.columns} rows={availableOrdersData?.rows} /> }
        </>        
    }
    const AcceptedOrdersComponent = (profileProps: any) => {
        return <>
            {acceptedOrdersData &&  <TableContainer columns={acceptedOrdersData?.columns} rows={acceptedOrdersData?.rows} /> }
        </>        
    }
    const HistoryComponent = (profileProps: any) => {
        return <>
            {historyData &&  <TableContainer columns={historyData?.columns} rows={historyData?.rows} /> }
        </>        
    }

    const profileFunction = () => {    
    }
    const availableOrdersFunction = () => {
        getData('http://localhost:4000/api/v1/dashboard/employee/available-order', 1);     
    }
    const acceptedOrdersFunction = () => {
        getData('http://localhost:4000/api/v1/dashboard/employee/accepted-order', 2);   
    }
    const historyFunction = () => {
        getData('http://localhost:4000/api/v1/dashboard/employee/history', 3);       
    }
    const otpHandler = (e: React.SyntheticEvent) =>{
        let target = e.target as HTMLInputElement;
        if(!isNumeric(target.value) || target.value.length > 6){
            target.value = target.value.substring(0, target.value.length - 1);
        }
        setOtp(target.value)
    }
    const otpSubmitHandler = async () => {
        setOtpVerficationState(STATUS.PROCESSING);
        console.log(otp, 'otp')
        const data = await request(
            REQUEST_TYPE.POST,
            `http://localhost:4000/api/v1/order/delivery/proceed/${orderId}`,
            process.env.REACT_APP_EMPLOYEE_TOKEN,
            {
                "otp": otp
            }
        )
        setOtpVerficationState(data.success ? STATUS.SUCCESS : STATUS.FAILED);
        if(data.success){
            setAcceptedOrdersData((prevAcceptedeOrdersData: any) => {
                let newRowList = [...prevAcceptedeOrdersData.rows].filter((row: any) => {
                    return row[0].value !== orderId
                })
                const newData ={
                    columns: prevAcceptedeOrdersData.columns,
                    rows: [...newRowList]
                };
                reinitializerOTPHandler()
                return newData;
            });
        }
    }
    function reinitializerOTPHandler(): void {
            setOtpModalVerificationState(false);
            setOtp("");
            setOtpVerficationState(STATUS.NOT_STARTED);
            setOrderId("");   
    }

  return (
    <>
        <Dashboard 
            navList={['Profile', 'Available Orders', 'Accepted Orders', 'History']}
            navIconList={[<AccountCircleOutlined />, <EventAvailableOutlined/>, <DomainVerificationOutlined />, <HistoryOutlined />]}
            mainContentList={
                [
                    <ProfileComponent />,
                    <AvailableOrdersComponent />,
                    <AcceptedOrdersComponent />,
                    <HistoryComponent />
                ]
            }
            stateHandlerList={
                [
                    profileFunction,
                    availableOrdersFunction,
                    acceptedOrdersFunction,
                    historyFunction
                ]
            }
        />
        <Modal open={otpModalVerificationState} handleClose={reinitializerOTPHandler}>
            <Box
                sx={{height: '250px', width: '390px', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'top', pointerEvents: otpVerifcationState === STATUS.PROCESSING ? 'none': ''}}
            >
                {/* <Typography variant="h4">
                    OTP VERICATION
                </Typography> */}
                <Typography variant="subtitle1">
                    <b>Please enter the otp sent on the order receipt email</b>
                </Typography>
                <TextField 
                    sx={{
                        mt: 1
                    }}
                    id="standard-basic" 
                    label="OTP"
                    variant="standard"
                    onInput = {otpHandler}
                    // onChange={otpHandler}
                    inputRef={otpFieldRef}
                    disabled={otpVerifcationState === STATUS.PROCESSING || otpVerifcationState === STATUS.SUCCESS}
                />
                <Button variant="contained" color="primary" sx={{mt: 5}} disabled={otp.length !== 6 || otpVerifcationState === STATUS.PROCESSING || otpVerifcationState === STATUS.SUCCESS} onClick={otpSubmitHandler}>
                  {otpVerifcationState === STATUS.NOT_STARTED && 'Confirm OTP' }
                  {otpVerifcationState === STATUS.PROCESSING && 'Processing' }
                  {otpVerifcationState === STATUS.FAILED && 'Failed' }
                  {otpVerifcationState === STATUS.SUCCESS && 'Success' }
                </Button>
                
                <Button 
                        variant="contained" 
                        color="primary"
                        onClick={reinitializerOTPHandler}
                        sx={{
                            width: '100px',
                            margin: 'auto',
                            mt: 1
                        }}
                    >
                        close
                    </Button>
            </Box>
        </Modal>
    </>
  );
}

export default Component;