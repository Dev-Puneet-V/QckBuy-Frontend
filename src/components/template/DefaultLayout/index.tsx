import Header from '../../organism/Header';
import { Outlet } from 'react-router-dom';
import { headerTheme } from '../../../theme'
import { ThemeProvider } from "@mui/material/styles";
import {
    Box
} from '@mui/material';
const Component = () => {
    return (
        <>
        <ThemeProvider theme={headerTheme}>
            <Header />
        </ThemeProvider>
        <Box sx={{position: 'fixed', top: '70px', left: '0px' }}>
            <Outlet />
        </Box>
        </>
    )
}

export default Component;