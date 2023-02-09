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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import {darkTheme} from '../../../theme';
import { VictoryPie, VictoryChart, VictoryTheme, VictoryLine} from 'victory';
import TableContainerEx from '../../molecule/TableContainer';
import { 
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Button
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { 
} from "@mui/icons-material";
import moment from 'moment/moment.js';
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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

const StyledComponent = styled('div')({
});
function createData(
    id: string,
    initiation_date: string
  ) {
    return { id, initiation_date };
  }
  

  const data = {
    "columns": [
      {
        "name": "announcement_type",
      },
      {
        "name": "announcement_by"
      },
      {
          "name": ""
      }
    ],
    "rows": [[
      {
        "value": "To be announced",
      },
      {
        "value": "To be announced after 5",
      },
      {
        "value": <Button variant="contained" color="secondary">
                check
            </Button> 
      }
    ],
    [
        {
            "value": "To be announced",
          },
          {
            "value": "To be announced after 5",
          },
          {
            "value": <Button variant="contained" color="secondary">
                check
            </Button> 
          }
    ],
    [
        {
          "value": "To be announced",
        },
        {
          "value": "To be announced after 5",
        },
        {
            "value": <Button variant="contained" color="secondary">
            check
        </Button> 
        }
      ],
      [
          {
              "value": "To be announced",
            },
            {
              "value": "To be announced after 5",
            },
            {
                "value": <Button variant="contained" color="secondary" onClick={() => {console.log("Hello")}}>
                check
            </Button> 
            }
      ]
    
]
  }

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedState, setSelectedState] = React.useState(0); 
  const navList = ['Home', 'Available Orders', 'Accepted Orders', 'Offers', 'Announcements', 'History'];
  const orders:any = []
  for(let i = 0; i < 50; i++){
    orders.push({
        id: '63e2e2c44103efd4980dc76f',
        initiation_date: moment(Date.now()).format("MMMM Do YYYY")
      })
  }
  const rows = orders?.map((currOrder: any) => {
    return createData(currOrder?.id, currOrder?.initiation_date);
})
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
            <Typography variant="h6" noWrap component="div" >
                {navList[selectedState]}
            </Typography>
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
            {navList?.map((text, index) => (
                <ListItem onClick={() => {setSelectedState(index)}} key={text} disablePadding sx={{ display: 'block' }} selected={selectedState === index}>
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
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
        <Box component="main" sx={{pt: 1, pb: 1, width: '100%'}}>
            {/* <DrawerHeader /> */}
        {selectedState === 0 &&    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                <Card sx={{height : '300px', w: '300px', m: 5}}>
                <VictoryPie
                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                    data={[
                    { x: "1 Star", y: 5 },
                    { x: "2 Star", y: 15 },
                    { x: "3 Star", y: 35 },
                    { x: "4 Star", y: 5 },
                    { x: "5 Star", y: 40 }
                    ]}
                />
                </Card>
                <Card sx={{height : '300px', w: '300px', m: 5, backgroundColor: '#fff'}}>
                <VictoryChart
                    >
                    <VictoryLine
                        style={{
                        data: { stroke: 'lightgrey' },
                        parent: { border: "0.1px solid black"}
                        }}
                        data={[
                        { x: 1, y: 1 },
                        { x: 2, y: 1.5 },
                        { x: 3, y: 2 },
                        { x: 4, y: 2.5 },
                        { x: 5, y: 3 },
                        { x: 6, y: 4 },
                        { x: 7, y: 5 },
                        { x: 8, y: 6 },
                        { x: 9, y: 7 },
                        { x: 10, y: 8 },
                        { x: 11, y: 9 },
                        { x: 12, y: 10 },
                        { x: 13, y: 12 },
                        { x: 14, y: 13 },
                        { x: 15, y: 14 },
                        { x: 16, y: 15 },
                        { x: 17, y: 16 },
                        { x: 18, y: 17 },
                        { x: 19, y: 18 },
                        { x: 20, y: 19 }
                        ]}
                    />
                    </VictoryChart>
                </Card>
            </Box>
        }
        {
            selectedState === 1 && 
            <Box>
              <Card sx={{p: 2, m:2}}>
                  <TableContainer component={Paper} sx={{width: '100%'}}>
                      <Table sx={{ width: '100%' }} aria-label="customized table">
                          <TableHead>
                              <TableRow>
                                  <StyledTableCell align="left">order_id</StyledTableCell>
                                  <StyledTableCell align="left">order_initiation_Date</StyledTableCell>
                                  <StyledTableCell align="center"></StyledTableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody sx={{height: '85vh', overyflowY: 'scroll'}}>
                              {rows.map((row: any) => (
                                  <StyledTableRow key={row.id}>
                                      <StyledTableCell    align="left">{row.id}</StyledTableCell>
                                      <StyledTableCell    align="left">{row.initiation_date}</StyledTableCell>
                                      <StyledTableCell     align="right">
                                          <Button variant="contained" color="secondary">
                                              accept_order
                                          </Button>
                                      </StyledTableCell>
                                  </StyledTableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  </Card>
            </Box>
        }
        {
            selectedState === 2 && 
            <Box>
              <Card sx={{p: 2, m:2}}>
                  <TableContainer component={Paper} sx={{width: '100%'}}>
                      <Table sx={{ width: '100%' }} aria-label="customized table">
                          <TableHead>
                              <TableRow>
                                  <StyledTableCell align="left">order_id</StyledTableCell>
                                  <StyledTableCell align="left">order_acceptance_date</StyledTableCell>
                                  <StyledTableCell align="center"></StyledTableCell>
                                  </TableRow>
                          </TableHead>
                          <TableBody sx={{height: '85vh', overyflowY: 'scroll'}}>
                              {rows.map((row: any) => (
                                  <StyledTableRow key={row.id}>
                                      <StyledTableCell    align="left">{row.id}</StyledTableCell>
                                      <StyledTableCell    align="left">{row.initiation_date}</StyledTableCell>
                                      <StyledTableCell     align="right">
                                          <Button variant="contained" color="secondary">
                                              Proceed_For_Delivery
                                          </Button>
                                      </StyledTableCell>
                                  </StyledTableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  </Card>
            </Box>
        }
        {
            selectedState === 3 && 
            <Box>
              <Card sx={{p: 2, m:2}}>
                  <TableContainer component={Paper} sx={{width: '100%'}}>
                      <Table sx={{ width: '100%' }} aria-label="customized table">
                          <TableHead>
                              <TableRow>
                                  <StyledTableCell align="left">offer_type</StyledTableCell>
                                  <StyledTableCell align="left">offer</StyledTableCell>
                                  <StyledTableCell align="center"></StyledTableCell>
                                  </TableRow>
                          </TableHead>
                          <TableBody sx={{height: '85vh', overyflowY: 'scroll'}}>
                              {rows.map((row: any, index: number) => (
                                  <StyledTableRow key={row.id}>
                                      <StyledTableCell    align="left">{index % 2 === 0 ? "Holiday Package" : "discount"}</StyledTableCell>
                                      <StyledTableCell    align="left">{index % 2 === 0 ? "3 days trip to himalaya" : "60% flat discount on smartphone"}</StyledTableCell>
                                      <StyledTableCell    align="right">
                                          <Button variant="contained" color="secondary">
                                              checkout
                                          </Button>
                                      </StyledTableCell>
                                  </StyledTableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  </Card>
            </Box>
        }
        {
            selectedState === 4 && 
            <Box>
              <Card sx={{p: 2, m:2}}>
                    <TableContainerEx columns={data.columns} rows={data.rows} />
                </Card>
            </Box>
        }
        {
            selectedState === 5 && 
            
            <Box>
              <Card sx={{p: 2, m:2}}>
                
                  <TableContainer component={Paper} sx={{width: '100%'}}>
                      <Table sx={{ width: '100%' }} aria-label="customized table">
                          <TableHead>
                              <TableRow>
                                  <StyledTableCell align="left">order_id</StyledTableCell>
                                  <StyledTableCell align="right">delivery_date</StyledTableCell>
                                  </TableRow>
                          </TableHead>
                          <TableBody sx={{height: '85vh', overyflowY: 'scroll'}}>
                              {rows.map((row: any) => (
                                  <StyledTableRow key={row.id}>
                                      <StyledTableCell    align="left">{row.id}</StyledTableCell>
                                      <StyledTableCell    align="right">{row.initiation_date}</StyledTableCell>
                                  </StyledTableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  </Card>
            </Box>
        }
        </Box>
        </Box>
    </ThemeProvider>
  );
}