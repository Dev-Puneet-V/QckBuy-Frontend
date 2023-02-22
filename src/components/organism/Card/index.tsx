import * as React from "react";
import { 
    Card, 
    Box, 
    Rating,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography 
} from "@mui/material";
import { 
    ShoppingCartOutlined, 
    VisibilityOutlined 
} from "@mui/icons-material";
import TextIcon, { PositionType } from '../../molecule/TextIcon';
import { useNavigate } from "react-router-dom";

interface CardPropsType {
    width: string;
    height: string;
    backgroundColor: string;
    image: string;
    name: string;
    description: string;
    cost: string | number;
    setCurrentRoutePath: any;
}

const ProductCard = (props: any) => {
  const navigate = useNavigate(); 
  return (
    <Card sx={{ 
        width: 300, 
        height: 400,
        backgroundColor: '#f9f7fb',  
        boxShadow: '0px 4px 8px rgba(38, 35, 36, 0.1)'
    }}>
      <CardMedia
        component="img"
        alt={props.product.name}
        height="200"
        image={props.product?.photos[0]?.secure_url}
        onClick={() => navigate(`product/${props.product?._id}`)}
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="subtitle1" component="div">
            {props.product.name}
          </Typography>
          <Rating name="read-only" value={props.product.ratings} readOnly />
        </Box>
        <Box height="50px">
          <Typography variant="body2" color="text.secondary">
            {props.product.description}
          </Typography>
        </Box>
        
      </CardContent>
      <CardActions sx={{
        display: 'flex',
        justifyContent: 'space-between',
        color: 'black'
      }}>
        <Button size="small">
          <Typography sx={{color: 'grey'}}>
            Rs {props.product.price}
          </Typography>
        </Button>
        <Button size="small">
          <TextIcon 
            text="Add to cart" 
            icon={<ShoppingCartOutlined sx={{color: 'grey'}} />} 
            iconPosition={PositionType.Right} 
          />
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;