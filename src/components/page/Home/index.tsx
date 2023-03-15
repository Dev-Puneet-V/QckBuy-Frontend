import { styled } from "@mui/system";
import { Box } from "@mui/material";
import Card from "../../organism/Card";
import { Pagination } from "../../molecule";
import * as React from 'react';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Props {
  products: Product[];
}

const StyledComponent = styled("div")({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflow: 'scroll !important', 
    scrollbarWidth: 'thin',
    scrollbarColor: '#999999 #f5f5f5',
    '&::-webkit-scrollbar': {
        width: '2px',
        height: '150px',
        display: 'inline',
    },
    '&::-webkit-scrollbar-track': {
    // backgroundColor: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
    borderLeft: '4px white solid',
    backgroundClip: 'padding-box'
    },
    '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
    }
});





const Component = () => {
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPage, setTotalPage] = React.useState<number>(1);
 React.useEffect(() =>{
    const processor = async () => {
        let response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/product/?page=${currentPage}`);
        let data = await response.json();
        setTotalPage(Math.ceil(data.totalCountProduct / data.resultPerPage));
        setProducts(data.products);
    }
    processor();
  }, [currentPage]);
  const handleChange = (value: number) =>{
    setCurrentPage(value);
  }
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100vw', height: 'calc(100vh - 70px)'}}>
        <StyledComponent>
            {products.map((product: any) => (
            <Box sx={{ m: 1 }} key={product._id}>
                <Card product={product} sx={{m: 1}}/>
            </Box>
            ))}
        </StyledComponent>
      <Box sx={{ height: "50px", width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'fixed', bottom: '10px' }}>
        {products && <Pagination currentPage={currentPage} totalPages={totalPage} onChange={handleChange} /> }
      </Box>
    </Box>
  );
};

export default Component;
