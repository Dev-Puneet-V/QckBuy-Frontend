import * as React from "react";
import { 
    Typography,
    Box,
    Rating
} from "@mui/material";
import { 
} from "@mui/icons-material";
import { 
    styled 
} from "@mui/system";
import Image from '../../atom/Image';

interface ReviewPropsType {
    review: String;
    rating: number;
    name: String;
}

const StyledComponent = styled('div')({
    width: 'calc(100%-5px)',
    minHeight: '100px',
    boxShadow: '1px 1px 4px 0px rgba(51,47,51,0.26)',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
    margin: '5px'
});


const Component = (props: ReviewPropsType) => {
    const {
        rating,
        review,
        name
    } = props;
    return (
        <StyledComponent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '50px',
                    marginBottom: '5px'
                }}
            >
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '3px'
                    }}>
                    <Image
                        height="35px"
                        width="35px"
                        sx={{
                            borderRadius: '50%',
                            marginRight: '5px'
                        }}
                        src={'https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper-thumbnail.png'}
                    />
                    <Typography variant="subtitle1">
                        <b>{name}</b>
                    </Typography>
                </Box>
                <Rating name="read-only" value={rating || 0} readOnly />
            </Box>
            <Box sx={{
                height: 'auto'
            }}>
                <Typography variant="subtitle2">
                    {review}
                </Typography>
            </Box>
            
        </StyledComponent>
    )
}

export default Component;