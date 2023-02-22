import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Checkbox, 
    ListItemText, 
    Input,
    Box
} from '@mui/material';
import { request } from '../../../hooks';
import { REQUEST_TYPE, STATUS } from '../../../type';
import ProcessingButton from '../../atom/ProcessingButton';
import { useCookies } from 'react-cookie';
const categories = ['shortsleeves', 'longsleeves', 'sweatshirts', 'hoodies'];

const AddProductForm = (props: any) => {
    const {
        productHandler
    } = props;
    const [cookies] = useCookies(['token']);
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productPhotos, setProductPhotos] = useState<File[]>([]);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<string>('');
  const [productBrand, setProductBrand] = useState<string>('');
  const [state, setProuctAddtionState] = useState<STATUS>(STATUS.NOT_STARTED);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setProuctAddtionState(STATUS.PROCESSING);
    event.preventDefault();
    const productData = {
        name: productName,
        description: productDescription,
        quantity: productQuantity,
        // files: {photos: productPhotos,
        price: productPrice,
        category: productCategory,
        brand: productBrand,
    };
    const fileData = productPhotos;
    const data = await request(
        REQUEST_TYPE.POST,
        process.env.REACT_APP_API_BASE_URL + '/product',
        cookies.token,
        productData,
        fileData
    );
    setProuctAddtionState(data.success ? STATUS.SUCCESS: STATUS.FAILED);
    if(data.success){
        productHandler(data.product);
    }
  }
  const reintializeState = () => {
    setProductBrand('');
    setProductDescription('');
    setProductQuantity(0);
    setProductBrand('');
    setProductCategory('');
    const newPhotos = [...productPhotos];
    newPhotos.splice(newPhotos.length, 1);
    setProductPhotos(newPhotos);
    setProuctAddtionState(STATUS.NOT_STARTED);
    setProductPrice(0);
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Product Name"
        value={productName}
        onChange={(event) => setProductName((event.target as  HTMLInputElement).value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Product Description"
        value={productDescription}
        onChange={(event) => setProductDescription((event.target as  HTMLInputElement).value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Product Quantity"
        value={productQuantity}
        onChange={(event: any) => setProductQuantity(parseInt((event.target as  HTMLInputElement).value))}
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Product Photos"
        type="file"
        onChange={(event) => {
            const target = (event.target as HTMLInputElement);
            if (target.files) {
              setProductPhotos(Array.from(target.files));
            }
          }}
        InputLabelProps={{
          shrink: true,
        }}
        required
        fullWidth
        margin="normal"
        inputProps={{
            multiple: true
          }}
      />
      <TextField
        label="Product Price"
        value={productPrice}
        onChange={(event) => setProductPrice(parseInt((event.target as  HTMLInputElement).value))}
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        required
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="product-category-label">Product Category</InputLabel>
        <Select
          labelId="product-category-label"
          id="product-category"
          value={productCategory}
          onChange={(event) => {
            const selectedOption = (event.target as HTMLInputElement).value;
            setProductCategory(selectedOption)
          }}
          input={<Input />}
          renderValue={(selected: string) => selected}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={productCategory.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Product Brand"
        value={productBrand}
        onChange={(event) => setProductBrand((event.target as  HTMLInputElement).value)}
        required
        fullWidth
        margin="normal"
      />
      
    {
        state === STATUS.NOT_STARTED && 
        <Button type="submit" variant="contained" color="primary">Add Product</Button>
    }
    {
        state === STATUS.PROCESSING &&
        <ProcessingButton loading={true} variant='contained'>
            Processing
        </ProcessingButton>
    }
    {
        state === STATUS.FAILED && 
        <Button type="submit" variant="contained" color="error" sx={{opacity: 0.5}}>Failure, please retry</Button>
    }
    {
        state === STATUS.SUCCESS && 
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button variant="contained" color="success" sx={{opacity: 0.5}}>Success</Button>
            <Button variant="contained" color="primary" onClick={() => {reintializeState()}}>Add new product</Button>
        </Box>
    }
    </form>
    
      </>
  );
};

export default AddProductForm;
