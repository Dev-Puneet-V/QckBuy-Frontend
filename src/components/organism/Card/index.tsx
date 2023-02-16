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
    AddShoppingCartOutlined, 
    VisibilityOutlined 
} from "@mui/icons-material";
import TextIcon, {PositionType} from '../../molecule/TextIcon';
import { useNavigate } from "react-router-dom";

interface CardPropsType {
    width: String;
    height: String;
    backgroundColor: String;
    image: String;
    name: String;
    description: String;
    cost: String | Number;
    setCurrentRoutePath: any;
}

const Component = (props: any) => {
  let navigate = useNavigate(); 
  return (
    <Card sx={{ 
        width: 300, 
        backgroundColor: '#fcf7ff',  
        boxShadow: '1px 1px 3px -1px rgba(82,70,82,1)'
    }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={props.product?.photos[0]?.secure_url}
        onClick={() => {navigate(`product/${props.product?._id}`)}}
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
            <TextIcon text="Add to cart" icon={<AddShoppingCartOutlined sx={{color: 'grey'}} />} iconPosition={PositionType.Right} />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Component;
