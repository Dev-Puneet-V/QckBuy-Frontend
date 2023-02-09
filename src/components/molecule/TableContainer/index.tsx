import { FC, ReactNode } from 'react';
import {  
    TableContainer,
    Paper
} from "@mui/material";
import Table from '../Table';
interface TableContainerPropsType {
    columns: {
        name: string 
    }[]
    ,
    rows: {
        value: string | ReactNode
    }[][]
}

const Component = (props: TableContainerPropsType) => {
    const {
        columns,
        rows
     } = props;
    return (
        <TableContainer component={Paper} sx={{width: '100%'}}>
            <Table columns={columns} rows={rows}/>
        </TableContainer>
    )
}

export default Component;