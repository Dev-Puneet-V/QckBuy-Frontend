import { AppBar, Badge } from "@mui/material";
import { Box, styled } from "@mui/system";
import TextIcon, {PositionType} from '../../molecule/TextIcon';
import {
    ShoppingCart,
    Logout,
    AccountCircle
 } from '@mui/icons-material';

const StyledComponent = styled('div')({
    // color: 'darkslategray',
    height: '50px',
    margin: '0px',
    padding: '0px'
});

const component = (props: any) => {
    return (
        <StyledComponent sx={{ flexGrow: 1 }}>
            <AppBar 
                position="static" 
                sx={{
                    backgroundColor: 'white',
                    height: '50px',
                    diplay: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyItems: 'center',
                    alignItems: 'center'
                }}>
                    
                    <TextIcon icon={
                        <Badge badgeContent={1} color="error">
                            <ShoppingCart />
                        </Badge>
                        } iconPosition={PositionType.Left} />
                    <TextIcon text="Profile" icon={<AccountCircle />} iconPosition={PositionType.Left} />
                    <TextIcon text="Logout" icon={<Logout />} iconPosition={PositionType.Left} />
                </Box>
            </AppBar>
        </StyledComponent>
    )
}
export default component;