import { ReactNode } from 'react';
import {
    Table,
} from "@mui/material";
import TableBody from '../TableBody';
import TableHead from '../TableHead';
export interface TablePropsType {
    columns: {
        name: string 
    }[]
    ,
    rows: {
        value: string | ReactNode
    }[][]
}

const Component = (props: TablePropsType) => {
    const {
        columns,
        rows
     } = props;
    return (
            <Table sx={{ width: '100%' }} aria-label="customized table">
                <TableHead data={columns}/>
                <TableBody sx={{height: 'auto', maxHeight: '85vh', overyflowY: 'scroll'}} data={rows}/>
            </Table>
    )
}

export default Component;