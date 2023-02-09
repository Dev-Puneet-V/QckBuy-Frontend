import {
    TableHead
} from "@mui/material";
import TableRow from '../TableRow';
interface TableHeadPropsType {
    data: {
        name: string 
    }[]
}

const Component = (props: TableHeadPropsType) => {
    const {
        data
     } = props;
    return (
        <TableHead>
            <TableRow variant='styled' data={data} type='th'/>
        </TableHead>
    )
}

export default Component;