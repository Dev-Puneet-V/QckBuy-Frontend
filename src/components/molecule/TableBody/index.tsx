import { ReactNode } from 'react';
import {
    TableBody
} from "@mui/material";
import TableRow from '../TableRow';
interface TableBodyPropsType {
    data: {
        value: string | ReactNode
    }[][];
    sx?: any;
}

const Component = (props: TableBodyPropsType) => {
    const {
        data,
        ...remProps
     } = props;
    return (
        <TableBody {...remProps}>
            {
                data.map((row: TableBodyPropsType["data"][0], index: number) => (
                    <TableRow data={row} variant='styled'/>
                ))
            }
        </TableBody>
    )
}

export default Component;