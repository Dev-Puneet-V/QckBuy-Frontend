import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, CardMedia, TextField, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { request } from '../../../hooks';
import { REQUEST_TYPE } from '../../../type';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    maxHeight: 500,
    minWidth: 300
    // width: 400
  },
  mediaContainer: {
    display: 'flex',
    overflowX: 'scroll',
    margin: theme.spacing(1, 0),
  },
  media: {
    flexShrink: 0,
    width: 300,
    height: 200,
    marginRight: theme.spacing(1),
  },
  icon: {
    marginLeft: '4px',
    cursor: 'pointer',
  },
  textField: {
    marginBottom: '4px',
  },
}));

const ProductInfo = ({ product }) => {
  const [cookies] = useCookies(['token']);
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  const [remaining, setRemaining] = useState(product?.quantity);
  const [category, setCategory] = useState(product?.category);
  const [brand, setBrand] = useState(product?.brand);
  const [price, setPrice] = useState(product?.price);
//   const [images, setImages] = useState([]);
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    setEditing(false);
    // send the updated product info to the server
    const reqBody = {
        price: price,
        brand: brand,
        category: category,
        description: description,
        name: name,
        quantity: remaining
    }
    const data = await request(
        REQUEST_TYPE.PUT,
        `${process.env.REACT_APP_API_BASE_URL}/product/${product?._id}`,
        cookies.token,
        reqBody
    );
    if(data.success){
        console.log(data)
    }
  };

  return (
    <Card className={classes.root} key={product?._id} sx={{width: '100%'}}>
      <CardHeader
        title={editing ? (
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            variant="standard"
            fullWidth
            className={classes.textField}
          />
        ) : (
          <Typography variant="h5" component="h2">{name}</Typography>
        )}
        action={editing ? (
          <Edit onClick={handleSave} className={classes.icon} />
        ) : (
          <Edit onClick={handleEdit} className={classes.icon} />
        )}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {editing ? (
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              variant="standard"
              fullWidth
              className={classes.textField}
            />
          ) : (
            description
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {editing ? (
            <TextField
              value={remaining}
              onChange={(e) => setRemaining(e.target.value)}
              label="Remaining in Stock"
              variant="standard"
              fullWidth
              className={classes.textField}
            />
          ) : (
            `Remaining in stock: ${remaining}`
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {editing ? (
            <TextField
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              variant="standard"
              fullWidth
              className={classes.textField}
            />
          ) : (
            `Category: ${category}`
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {editing ? (
            <TextField
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              label="Brand"
              variant="standard"
              fullWidth
              className={classes.textField}
            />
          ) : (
            `Brand: ${brand}`
            )}
            </Typography>
            <Typography variant="h6" color="textPrimary" component="p">
              {editing ? (
                <TextField
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  label="Price"
                  variant="standard"
                  fullWidth
                  className={classes.textField}
                />
              ) : (
                `Rs ${price}`
              )}
            </Typography>
          </CardContent>
        </Card>
      );
    };
    
    export default ProductInfo;
    