import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Component = (props: any) => {
    const {
        order
    } = props;
    const navigate = useNavigate();
    const {
        createdAt,
        updatedAt,
        _id,
        items,
        status
    } = order;
    const deliveryDateLabel = status === 'delivered' ? 'Delivery Date' : 'Updated At';
    const deliveryDate = status === 'delivered' ? updatedAt : createdAt;
  
    const rows = items?.map(({ product, quantity }) => {
      return {
        name: product.name,
        price: product.price,
        category: product.category,
        secure_url: product?.photos[0]?.secure_url,
        viewButton: (
          <Button variant="outlined" size="small" onClick={
            () => {
                navigate('/product/'+product._id);
            }
          }>
            View
          </Button>
        ),
        quantity,
      };
    });
  
    const totalAmount = items?.reduce((total, { product, quantity }) => {
      return total + product.price * quantity;
    }, 0);
  
    return (
      <Card>
        <CardHeader title={`Order #${_id}`} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>{deliveryDateLabel}: {new Date(deliveryDate).toLocaleDateString()}</Typography>
              <Typography gutterBottom>Order Status: {status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Total Amount: Rs {totalAmount}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{
                   maxHeight: '100px !important',
                    overflowY: 'scroll !important',
                  }}>
                    {rows?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Avatar src={row.secure_url} />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1">{row.name}</Typography>
                              <Typography variant="caption">{row.description}</Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell>{row.viewButton}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
}

export default Component;