import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  styled,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { request, REQUEST_TYPE } from '../../../hooks';
import ProductMiniImages from '../../organism/ProductMiniImage';
import ProductInfo from '../../organism/ProductInfo';

interface ProductPropsType {}

const StyledComponent = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const Component = (props: any) => {
  const [cookies] = useCookies(['token']);
  const [productInfo, setProductInfo] = useState<any>();
  const { id } = useParams();
  useEffect(() => {
    const processor = async () => {
      let data = await request(
        REQUEST_TYPE.GET,
        `https://qckbuy-production.up.railway.app/api/v1/product/${id}`,
        cookies.token
      );
      const productInfo = data.product;
      setProductInfo(productInfo);
    };
    processor();
  }, []);

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {productInfo ? (
          <Stack
            direction={isMobileView ? 'column' : 'row'}
            spacing={2}
            // justifyContent="center"
            alignItems="center"
            height="100%"
            width="96vw"
            sx={{
                ml: 1
            }}
          >
            <Box
              sx={{
                width: isMobileView ? '100%' : '100%',
                height: isMobileView ? 'auto' : '500px',
                boxSizing: 'border-box',
                margin: isMobileView ? '10px 0' : '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ProductMiniImages images={productInfo?.photos} />
            </Box>
            <Stack
              direction='column'
              spacing={1}
              justifyContent="center"
            //   alignItems="center"
              height="100%"
              width="100%"
            >
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
            </Stack>
          </Stack>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%'
          }}
        >
          <CircularProgress color='error' />
        </Box>
      )}
      
      </>
  );
};

export default Component;
