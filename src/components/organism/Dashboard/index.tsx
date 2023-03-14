import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Card } from '@mui/material';
import {darkTheme} from '../../../theme';
import { ExitToApp } from '@mui/icons-material';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../../contexts/User';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface HeaderContentType {
  isVisible?: boolean;
  content?: React.ReactNode;
}

interface DashboardPropsType {
    navList: string[];
    navIconList?: React.ReactNode[];
    //length should be same of stateHandleList to navList
    stateHandlerList: ((...params: any) => void)[];
    //length should be same of stateHandleList to navList
    mainContentList: React.ReactNode[];
    header?: HeaderContentType[];
}

const Component = (props: DashboardPropsType) => {
    let {
        navList,
        navIconList,
        stateHandlerList,
        mainContentList,
        header
    } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const userContext = React.useContext(UserContext);
 const navigate = useNavigate();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [selectedState, setSelectedState] = React.useState(0); 
  const stateHandler = (index: number) => {
    setSelectedState(index);
    stateHandlerList.length > index && stateHandlerList[index]();
  }
  const handleLogout = () => {
    userContext?.setUser(undefined);
    removeCookie("token");
    navigate("/login");
  };
  return (
    <ThemeProvider theme={darkTheme}>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Box sx={{width: "calc(100vw - 50px)", display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Typography variant="h6" noWrap component="div" >
                  {navList[selectedState]}
              </Typography>
              
              <Button
              variant="contained"
              color="secondary"
              // className={classes.logoutButton}
              onClick={handleLogout}
              endIcon={<ExitToApp />}
              >
              Logout
            </Button>
            </Box>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{p: 0}}>
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider sx={{}}/>
            <List sx={{padding: '0px'}}>
                {navList?.map((text: string, index: number) => (
                    <ListItem onClick={() => stateHandler(index)} key={text} disablePadding sx={{ display: 'block' }} selected={selectedState === index}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                            >
                                {navIconList && index < (navIconList.length) && navIconList[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
        <Box component="main" sx={{pt: 1, pb: 1, width: '100%', mt: '55px'}}>
            {header && header[selectedState] && header[selectedState]?.isVisible &&
              <DrawerHeader>
                { header[selectedState]?.content}
              </DrawerHeader>
              }
            <Box>
              <Card sx={{p: 2, ml: 2, mr: 2, mt: header && header[selectedState] && header[selectedState]?.isVisible ? 0: 2, height: header && header[selectedState] && header[selectedState]?.isVisible ? '80vh' : '88vh'}}>
                    {mainContentList[selectedState]}
                </Card>
            </Box>
        </Box>
        </Box>
    </ThemeProvider>
  );
}

export default Component;