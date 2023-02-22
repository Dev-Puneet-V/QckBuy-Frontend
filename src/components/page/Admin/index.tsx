import * as React from "react";
import { useForm } from 'react-hook-form';
import {  
    Box,
    Button
} from "@mui/material";
import { 
    AccountCircleOutlined,
    Inventory2Outlined,
    BadgeOutlined,
    ManageAccountsOutlined,
    AddOutlined
} from "@mui/icons-material";
import ProductForm from '../../molecule/ProductForm';
import Dashboard from '../../organism/Dashboard';
import { STATUS, REQUEST_TYPE } from "../../../type";
import {
    Modal,
    Search,
} from '../../molecule';
import AdminProducts from '../../organism/SecureProducts';
import { request } from "../../../hooks";
import SecureEmployee from '../../organism/SecureEmployee';
import {
    EmployeeState
} from '../../../contexts/Employee';
import { useCookies } from "react-cookie";
const Component = (props: any) => {
    const cookies = useCookies(['token']);
    const inputRef = React.useRef<{ productSearchHandler: (event: React.SyntheticEvent) => void }>();
    const [products, setProducts] = React.useState<any>([]);
    const [state, setState] = React.useState<STATUS>(STATUS.NOT_STARTED);
    const [isProductAddModalVisible, setProductAddModalVisibility] = React.useState<boolean>(false);
    const {
        formState: { errors },
      } = useForm();
    React.useEffect(() => {
        request(
            REQUEST_TYPE.GET,
            `${process.env.REACT_APP_API_BASE_URL}/product/admin`,
            cookies.token
        ).then(data => {
            if(data && data.success){
                setProducts(data.products);
            }
        })
    }, []);

    const ProfileComponent = () => {
        return <>
        </>
    }

    const ProductsComponent = () => {
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
                <AdminProducts productList={products} childRef={inputRef}/>
        </Box>
    }

    const EmployeesComponent = () => {
        return <>
            <SecureEmployee />
        </>
    }

    const ManagersComponent = () => {
        return <>
            <SecureEmployee employeeType='manager'/>
        </>
    }

    const productSearchHandler = (event: React.SyntheticEvent) =>{
        inputRef?.current?.productSearchHandler(event);
    }

    const addProductHandler = async () => {
        setProductAddModalVisibility(true);
    }
    const closeAddProductModal = async () => {
        setProductAddModalVisibility(false);
    }

    const productHandler = (productData: any) => {
        const newProduct = productData;
        setProducts([...products, newProduct])
    }

    const AddProduct = () => {
        return (
            <>
                <Box sx={{
                    m: 1
                }}>
                    <ProductForm productHandler={() => {productHandler(products)}}/>
                </Box>
            </>
        )
    }
    const ProductHeaderComponent = () => {
        return (
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                <Search
                    placeholder='Search product'
                    onChange={productSearchHandler} 
                />
                <Button 
                    endIcon={<AddOutlined />} 
                    color="primary" 
                    variant="contained" 
                    disabled={state === STATUS.PROCESSING} 
                    sx={{height: '40px', width: '180px', m: 1}}
                    onClick={addProductHandler}
                >
                        Add product
                </Button>
            </Box>
        );
    };

    return (
        <EmployeeState>
            <Dashboard 
                navList={['Profile', 'Products', 'Employees', 'Managers']}
                navIconList={[<AccountCircleOutlined />, <Inventory2Outlined />, <BadgeOutlined />, <ManageAccountsOutlined />]}
                mainContentList={
                    [
                        <ProfileComponent />,
                        <ProductsComponent />,
                        <EmployeesComponent />,
                        <ManagersComponent />
                    ]
                }
                stateHandlerList={
                    [
                        () => {},

                    ]
                }
                header={[
                {},
                {
                    isVisible: true,
                    content: <ProductHeaderComponent />
                }]}
            />
            {
                <Modal open={isProductAddModalVisible} 
                handleClose={closeAddProductModal} 
                children={<AddProduct />}/>
            }
        </EmployeeState>
    )
}

export default Component;