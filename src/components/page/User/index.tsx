import * as React from "react";
import {  
    Box, Button
} from "@mui/material";
import { 
    AccountCircleOutlined,
    Inventory2Outlined
} from "@mui/icons-material";
import Dashboard from '../../organism/Dashboard';
import Tabs from '../../molecule/Tabs';
import { request, REQUEST_TYPE } from "../../../hooks";
import { useCookies } from "react-cookie";
import { USER_ORDER_TYPE_TAB_DATA } from "../../../type";
import { Modal, TableContainer } from "../../molecule";
import OrderInfo from '../../molecule/OrderInfo';
import UserProfile from '../UserProfile';
import { UserContext } from "../../../contexts/User";
const Component = (props: any) => {
    
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
    const [tabState, setTabState] = React.useState<string>(USER_ORDER_TYPE_TAB_DATA[0].value);
    const [orderList, setOrderList] = React.useState<any>();
    let [currentOrderFormat, setCurrentOrderFormat] = React.useState<any>({"columns" : [{"name" : "order_id"}, {"name": "order_date"}, {"name": 'status'}, {"name": ''}], "rows": [[{"value": "No items exists"}]]});
    let [oldOrderFormat, setOldOrderFormat] = React.useState<any>({"columns" :  [{"name" : "order_id"}, {"name": "delivery_date"}, {"name": 'status'}, {"name": ''}], "rows": [[{"value": "No items exists"}]]});
    let [detailedViewIsVisible, setDetailedViewVisibilityStatus] = React.useState(false);
    let [selectedOrder, setCurrentSelectedOrder] = React.useState<any>();
    const detailedViewHandler = (order?: any) => {
        setDetailedViewVisibilityStatus(!detailedViewIsVisible);
        setCurrentSelectedOrder(order);
    }
    React.useEffect(() => {
        request(
            REQUEST_TYPE.GET,
            `${process.env.REACT_APP_API_BASE_URL}/user/order`,
            cookies.token
        ).then(data => {
            const newCurrentOrderFormat = { ...currentOrderFormat };
            const newOldOrderFormat = { ...oldOrderFormat };
            
            data.orders.forEach((order: any) => {
                const currentRow = [   
                    { value: order._id },    
                    { value: order.status === 'delivered' ? new Date(order.updatedAt).toLocaleDateString('en-US') : new Date(order.createdAt).toLocaleDateString('en-US') }, 
                    { value: order.status },
                    { value: <Button variant="contained" 
                        onClick={() => {
                            detailedViewHandler(order);           
                        }}
                    >
                        View in detail
                    </Button> }    ];
                
                if (order.status !== 'delivered') {
                if (newCurrentOrderFormat.rows[0].length === 1) {
                    newCurrentOrderFormat.rows = [];
                }
                newCurrentOrderFormat.rows.push(currentRow);
                } else {
                if (newOldOrderFormat.rows[0].length === 1) {
                    newOldOrderFormat.rows = [];
                }
                newOldOrderFormat.rows.push(currentRow);
                }
            });

            setOrderList(data.orders);
            setCurrentOrderFormat(newCurrentOrderFormat);
            setOldOrderFormat(newOldOrderFormat);
        })
    }, []);

    const handleTabState = (currTabState: string) => {
        setTabState(currTabState);
    }
    const ProfileComponent = () => {
        return <>

        </>
    }

    const  OrdersComponent = () => {
        return <Box 
            sx={{
                display: 'flex', 
                justifyContent: 'center', 
                height: '100%', 
                width: '100%',  
                overflowY: 'scroll', 
                flexWrap: 'wrap'
            }}
        >
            
            <Tabs tabData={USER_ORDER_TYPE_TAB_DATA} stateHandler={handleTabState}/>
            <Box sx={{
                height: 'calc(100vh - 70px)',
                width: '100%'
            }}>
                {
                    tabState === USER_ORDER_TYPE_TAB_DATA[0].value &&
                    <TableContainer columns={currentOrderFormat?.columns} rows={currentOrderFormat?.rows} />
                }
                {
                    tabState === USER_ORDER_TYPE_TAB_DATA[1].value && 
                    <TableContainer columns={oldOrderFormat?.columns} rows={oldOrderFormat?.rows} />
                }
            </Box>
            
        </Box>
    }
    // const userContext = React.useContext(UserContext);
    console.log(cookies?.user)
    return (
        <>
            <Dashboard 
                navList={['Profile', 'Orders']}
                navIconList={[<AccountCircleOutlined />, <Inventory2Outlined />]}
                mainContentList={
                    [
                        <UserProfile />,
                        <OrdersComponent />,
                    ]
                }
                stateHandlerList={
                    [
                        () => {},
                    ]
                }
            />
            <Modal open={detailedViewIsVisible} 
            handleClose={detailedViewHandler} 
            children={<OrderInfo order={selectedOrder}/>}/>
        </>
    )
}

export default Component;


