import * as React from "react";
import { 
    Divider,
    Box,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { 
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import moment from 'moment/moment.js';
interface ReceiptPropsType {

}


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
  
  function createData(
    id: string,
    name: number,
    quantity: number,
    cost: number
  ) {
    return { id, name, quantity, cost };
  }
  


const StyledComponent = styled('div')({
});


const Component = (props: any) => {

    const rows = props.products?.map((currProduct: any) => {
        return createData(currProduct._id, currProduct.product?.name, currProduct.quantity, currProduct.product?.price);
    })

    return (
        <StyledComponent>
            <Box
                sx={{
                    diplay: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                }} 
            >
                <Typography 
                    variant="h5"
                    sx={{
                        margin: '10px',
                        textAlign: 'center'
                    }}
                >
                    <b>Invoice</b>
                </Typography>
                <Divider />
            </Box>
            <TableContainer component={Paper} sx={{margin: "10px 0px"}}>
                <Table sx={{ width: '100%' }} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>Bill payer</StyledTableCell>
                            <StyledTableCell align="right">Payment time</StyledTableCell>
                            <StyledTableCell align="right">Bill receiver</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={0}>
                            <StyledTableCell component="th" scope="row">
                                {"Paymer name"}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {moment(Date.now()).format("MMMM Do YYYY")}
                            </StyledTableCell>
                            <StyledTableCell align="right">{"Qckbuy pvt ltd"}</StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Product Id</StyledTableCell>
                            <StyledTableCell align="right">Product name</StyledTableCell>
                            <StyledTableCell align="right">Cost(Rs)</StyledTableCell>
                            <StyledTableCell align="right">Quantity</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                <StyledTableCell align="right">{row.cost}</StyledTableCell>
                                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledComponent>
    )
}

export default Component;