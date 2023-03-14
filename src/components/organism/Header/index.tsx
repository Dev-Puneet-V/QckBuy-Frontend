import React, { useContext } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, ExitToApp, ShoppingCart } from "@mui/icons-material";
import { makeStyles } from '@material-ui/core/styles';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/Cart";
import { UserContext } from "../../../contexts/User";
const useStyles = makeStyles((headerTheme) => ({
    appBar: {
      zIndex: headerTheme.zIndex.drawer + 1,
    },
    grow: {
      flexGrow: 1,
    },
    logo: {
      marginRight: headerTheme.spacing(2),
      display: "flex",
      alignItems: "center",
      height: '30px',
      width: '100px',
      [headerTheme.breakpoints.down("sm")]: {
        marginRight: 0,
      },
    },
    logoText: {
      fontWeight: "bold",
      [headerTheme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    iconButton: {
      [headerTheme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    profileButton: {
      marginLeft: headerTheme.spacing(1),
      marginRight: headerTheme.spacing(1),
      [headerTheme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
    loginButton: {
      marginRight: headerTheme.spacing(1),
      [headerTheme.breakpoints.down("sm")]: {
        // display: "none",
      },
    },
    logoutButton: {
      marginRight: headerTheme.spacing(1),
      [headerTheme.breakpoints.down("sm")]: {
        // display: "none",
      },
    },
  }));

const Header = () => {
  const classes = useStyles();
  const [cookies,, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const handleLogout = () => {
    userContext?.setUser(undefined);
    removeCookie("token");
    navigate("/login");
  };

  const cartRouteHandler = () => {
    navigate('/cart');
  }
  const homeRouteHandler = () => {
    navigate('/')
  }
  return (
    
    <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
        <Box className={classes.logo} onClick={homeRouteHandler}>
        <IconButton edge="start" color="inherit">
          <ShoppingCart />
        </IconButton>
        <Typography variant="h6" className={classes.logoText}>
            Qckbuy
        </Typography>
        </Box>
        <Box className={classes.grow} />
        {cookies.token ? (
        <Box>
            <IconButton className={classes.iconButton}>
            <Badge badgeContent={cartContext?.totalQuantity} color="error" onClick={cartRouteHandler}>
                <ShoppingCart />
            </Badge>
            </IconButton>
            <Button
            color="inherit"
            className={classes.profileButton}
            onClick={() => {navigate('/dashboard')}}
            >
            <AccountCircle />
            </Button>
            <Button
            variant="contained"
            color="secondary"
            className={classes.logoutButton}
            onClick={handleLogout}
            endIcon={<ExitToApp />}
            >
            Logout
            </Button>
        </Box>
        ) : (
        <Button
            variant="contained"
            color="secondary"
            className={classes.loginButton}
            onClick={() => navigate("/login")}
            endIcon={<ExitToApp />}
        >
            Login
        </Button>
        )}
    </Toolbar>
    </AppBar>
  );
};

export default Header;
