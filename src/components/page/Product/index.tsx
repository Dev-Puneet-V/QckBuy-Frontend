import React, { useState, useEffect }  from 'react';
import {  
    Button,
    CircularProgress
} from "@mui/material";
import { 
} from "@mui/icons-material";
import { 
    Box, 
    styled 
} from "@mui/system";
import ProductMiniImages from '../../organism/ProductMiniImage';
import ProductInfo from '../../organism/ProductInfo';
import { useParams } from 'react-router-dom';
interface ProductPropsType {

}

const StyledComponent = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    width: '100vw',
    justifyItems: 'left',
    // backgroundColor: '#f0f2f5' 
});




const Component = (props: any) => {
    const [productInfo, setProductInfo] = useState<any>();
    const { id } = useParams();
    useEffect(() =>{
        const processor = async () => {
            let response = await fetch(`http://localhost:4000/api/v1/product/${id}`, {
              headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_USER_TOKEN}`
            }
            });
            let data = await response.json();
            const productInfo = data.product;
            setProductInfo(productInfo);
        }
        processor();
      }, []);
    return (
        <StyledComponent>
            {
                !productInfo &&
                <CircularProgress color="error" />
            }
            {
                productInfo &&
                <>
                    <Box className="productImages" >
                        <Box>
                            {productInfo && <ProductMiniImages images={productInfo?.photos} />}
                        </Box>
                    </Box>
                    <Box className="productInfo">
                        <ProductInfo 
                            id={productInfo?._id}
                            name={productInfo?.name}
                            description={productInfo?.description}
                            ratings={productInfo?.ratings}
                            numberOfReviews={productInfo?.numberOfReviews}
                            reviews={productInfo?.reviews}
                            price={productInfo?.price}
                            category={productInfo?.category}
                            brand={productInfo?.brand}
                            quantity={productInfo?.quantity}
                        />
                    </Box>
                </>
            }
        </StyledComponent>
    )
}

export default Component;