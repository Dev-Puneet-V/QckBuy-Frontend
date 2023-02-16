import * as React from "react";
import { useForm } from 'react-hook-form';
import {  
    Box,
    Card,
    Button,
    IconButton,
    Typography,
    InputAdornment,
    TextField,
    TextFieldProps
} from "@mui/material";
import { 
    AccountCircleOutlined,
    Inventory2Outlined,
    BadgeOutlined,
    ManageAccountsOutlined,
    AddOutlined
} from "@mui/icons-material";
import { TablePropsType } from '../../molecule/Table';
import { 
    styled 
} from "@mui/system";
import ProductForm from '../../molecule/ProductForm';
import Dashboard from '../../organism/Dashboard';
import { ThemeProvider } from '@mui/material/styles';
import { baseTheme} from '../../../theme';
import { STATUS, REQUEST_TYPE } from "../../../type";
import {
    Modal,
    Search
} from '../../molecule';
import AdminProducts from '../../organism/AdminProducts';
import { filterData, request } from "../../../hooks";
import {
    TableContainer,
} from '../../molecule';
import moment from 'moment/moment.js';
const Component = (props: any) => {
    const [products, setProducts] = React.useState<any>([]);
    const [fileredProducts, setFilteredProducts] = React.useState<any>();
    const [state, setState] = React.useState<STATUS>(STATUS.NOT_STARTED);
    const [isProductAddModalVisible, setProductAddModalVisibility] = React.useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    console.log('rerendered')
    React.useEffect(() => {
        request(
            REQUEST_TYPE.GET,
            `${process.env.REACT_APP_API_BASE_URL}/product/admin`,
            process.env.REACT_APP_ADMIN_TOKEN
        ).then(data => {
            if(data && data.success){
                setProducts(data.products);
                setFilteredProducts(data.products);
            }
        })
    }, []);

    const ProfileComponent = () => {
        return <>
        </>
    }

    const ProductsComponent = () => {
        return <Box sx={{display: 'flex', justifyContent: 'center', height: '100%', width: '100%',  overflowY: 'scroll', flexWrap: 'wrap'}}>
            {/* {
                products?.map((product: any) => {
                    return <ThemeProvider theme={baseTheme}> */}
                        <AdminProducts productList={products} setProductList={setProducts}/>
                        {/* <Box sx={{m: 1}}><Card product={product} /></Box> */}
                    {/* </ThemeProvider>
                }) */}
            {/* } */}
        </Box>
    }

    const EmployeesComponent = () => {
        return <>
        </>
    }

    const ManagersComponent = () => {
        return <>
        </>
    }

    const productSearchHandler = (event: React.SyntheticEvent) =>{
        let target = event.target as HTMLInputElement;
        let value = target.value;
        const results = filterData(value, fileredProducts);
        setFilteredProducts(results);
    }

    const addProductHandler = async () => {
        setProductAddModalVisibility(true);
    }
    const closeAddProductModal = async () => {
        setProductAddModalVisibility(false);
    }

    const productHandler = (productData: any) => {
        const newProduct = productData;
        setProducts([newProduct, ...products])
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
        <>
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
        </>
    )
}

export default Component;