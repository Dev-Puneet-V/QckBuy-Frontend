import * as React from 'react'
import { Close, Search } from "@mui/icons-material";
import {
    Box
} from '@mui/material';
import {
    Input
} from '../../atom';
const Component = (props: any) => {
    const {
        placeholder,
        sx,
        onChange
    } = props;
    const [visibilityState, setVisibilityState] = React.useState(true);
    return (
        <Box sx={sx}>
            <Input sx={{
                   margin: '30px 10px',
                   height: '46px',
                   width: '90%',
                   maxWidth: '658px',
                   fontWeight: 'bold',
                   fontSize: {
                            xs: '18px',
                            md: '20px'
                        }
                }} 
                startIcon={<Search />} 
                // endIcon={<Close onClick={props.searchStateHandler} sx={{cursor: 'pointer'}}/>} 
                placeholder={placeholder} 
                onKeyUp={onChange}
            />
        </Box>
    )
}


export default Component;