import * as React from "react";
import {  
    Backdrop,
    Dialog,
} from "@mui/material";
import { 
} from "@mui/icons-material";
import { 
    Box, 
    styled 
} from "@mui/system";
interface ModalPropsType {
    open: boolean;
    handleClose: () => void;
    children: JSX.Element;
}

const StyledComponent = styled('div')({
    
});



const Component = (props: ModalPropsType) => {
    const {
        open,
        handleClose
    } = props;
    return (
        <StyledComponent>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Dialog 
                    onClose={handleClose} 
                    open={open}
                    sx={{
                        maxHeight: '100vh'
                    }}
                >
                    {props.children}
                </Dialog>
            </Backdrop>
        </StyledComponent>
    )
}

export default Component;