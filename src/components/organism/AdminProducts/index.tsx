import * as React from "react";
import {  
    CircularProgress,
    Typography,
    Button,
    Card
} from "@mui/material";
import { 
} from "@mui/icons-material";
import { 
    Box, 
    styled 
} from "@mui/system";
import {
    Modal
} from '../../molecule';
import {
    ProductType
} from '../../../type';
import Tabs from '../../molecule/Tabs'
import AdminProductListItem from '../../molecule/AdminProductListItem';
import StrictProductInfo from '../StrictProductInfo';
import { filterData, request } from "../../../hooks";

const tabData = [
    { 
      'value': 'info and editor',
      'label': 'Info',
    },
    // { 
    //   'value': 'image editor',
    //   'label': 'image edit'
    // },
    // { 
    //     'value': 'deletion',
    //     'label': 'delete'
    //   }
]

const Component = (props: any) => {
    const {
        productList,
        childRef
    } = props;
    
    const [filteredProducts, setFilteredProducts] = React.useState<any>(productList);
    React.useImperativeHandle(childRef, () => ({
        productSearchHandler(event: React.SyntheticEvent) {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            const results =  filterData(value, productList);
            setFilteredProducts(results);
        }
      }));
    const [currProduct, setCurrProduct] = React.useState<any>();
    const [currState, setCurrState] = React.useState(tabData[0].value);
    const handleState = (state:string) => {
        setCurrState(state);
    }
    const detailStateHandler = (product?: any) => {
        setCurrProduct(product)
    }
    
    const ProductInfoModal = () => {
        return (
            <>
                <Tabs tabData={tabData} stateHandler={handleState} />
                {
                    currState === tabData[0].value && 
                    <StrictProductInfo product={currProduct}/>
                }
            </>
        )
    }

    return (
        <>
            {
                !filteredProducts && 
                <Box sx={{
                    height: '100%', 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress
                        size={30}
                        color="secondary"
                        style={{ position: "absolute"}}
                    />
                </Box>
            }
            {
                filteredProducts && 
                <>
                
                    <Box sx={{
                    height: '500px', 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    {console.log(filteredProducts.length, 'length')}
                    {
                       
                       filteredProducts?.map((product: any) => {
                            return (
                                <Card sx={{p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', m: 2}}>
                                    <Typography>
                                        {product._id}
                                    </Typography>
                                    <Typography>
                                        {product.name}
                                    </Typography>
                                    <Button variant='contained' sx={{m: 1}} color='secondary' onClick={() => detailStateHandler(product)}> 
                                        Detail
                                    </Button>
                                </Card>
                            )
                        })
                    }
                    <Modal children={<ProductInfoModal />} open={currProduct !== undefined} handleClose={() => detailStateHandler()}/>
                </Box>
                </>
                
            }
        </>
    )
}

export default Component;