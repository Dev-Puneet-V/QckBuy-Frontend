import * as React from "react";
import { 
    Box,
    Typography
} from "@mui/material";
import { 
} from "@mui/icons-material";
import { 
    styled 
} from "@mui/system";

import {
    ProductType, REQUEST_TYPE,
} from '../../../type';
import { request } from "../../../hooks";


const Component = (props: any) => {
    const {
        product,
        productViewDetailHandler
    } = props;
    const [productInfo, setProductInfo] = React.useState<any>(product)
    React.useEffect(() => {
    }, []);
    const productInfoHandler = () => {

    }
    return (
        <>
                { productInfo &&
                    <Box key={productInfo?._id}>
                        <Typography onClick={() => {}}>
                            {productInfo?.name}
                        </Typography>
                        <Typography>
                            {productInfo?.quantity}
                        </Typography>
                    </Box>
                }
                {
                    !productInfo && <></>
                }
        </>
    )
}

export default Component;