import { ReactNode } from 'react';
import {
    TableCell,
    styled,
    tableCellClasses
} from "@mui/material";
interface TableCellPropsType {
    align?: "left" | "center" | "right" | "justify" | "inherit" | undefined;
    variant?: "styled" | undefined;
    children: ReactNode | string;
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

const Component = (props: TableCellPropsType) => {
    const {
        align,
        variant
     } = props;
    return (<>
            {variant === "styled" ?
                <StyledTableCell 
                    align={align}
                >
                    {props.children}
                </StyledTableCell> :
                <TableCell
                    align={align}
                >
                    {props.children}
                </TableCell>
            }
        </>
    )
}

export default Component;