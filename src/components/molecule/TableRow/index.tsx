import { ReactNode } from 'react';
import {
    styled,
    TableRow
} from "@mui/material";
import TableCell from '../../atom/TableCell';

interface TableRowPropsType {
    data: {
        value?: string | ReactNode,
        name?: string
    }[];
    variant?: "styled" | undefined;
    type?: "th" | undefined
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));


const getChild = (data: TableRowPropsType["data"], type?: string) => {
    return <>
            {
                data.map((rowCol: TableRowPropsType["data"][0], index: number) => (
                        <TableCell  
                            variant="styled"
                            align={index !== (data.length - 1) ? "left" : "right"}
                        >
                            {!type && rowCol?.value}
                            {type && rowCol?.name}
                        </TableCell>
                    ))
            }
        </>
}

const Component = (props: TableRowPropsType) => {
    const {
        variant,
        data, 
        type
     } = props;
    return (<>
            {
                variant === "styled" ?
                <StyledTableRow>
                    {
                        getChild(data, type)
                    }
                </StyledTableRow> : 
                <TableRow>
                    {
                        getChild(data, type)
                    }
                </TableRow>
            }
        </>
    )
}

export default Component;