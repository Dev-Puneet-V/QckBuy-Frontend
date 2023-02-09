import  { useEffect, useState } from "react";
import { 
    Box 
} from "@mui/material";
import { 
} from "@mui/icons-material";
import Image from '../../atom/Image';

import { 
    styled 
} from "@mui/system";

interface ProductMiniImagesPropsType {

}

const StyledComponent = styled('div')({
    width: '550px',
    height: '500px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyItems: 'center',
    alignItems: 'center',
    margin: '5px',
    padding: '3px'
});


const Component = (props: any) => {
    const [currImageIndex, setCurrentImageIndex] = useState<number>(0);
    useEffect(() => {
    }, [currImageIndex])
    const {
        images
    } = props;
    return (
        <StyledComponent>
            <Box sx={{
                width: '120px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px',
                margin: '5px'
            }}>
                {
                    images?.map((currImage:any, index: number) => {
                        return ( 
                            <Box 
                                onClick={() => {
                                    setCurrentImageIndex(index);
                                }}
                                sx={{
                                    opacity: `${index === Number(currImageIndex) ? 1 : 0.3}`
                                }}          
                            >
                                <Image
                                    id={currImage._id}
                                    src={currImage.secure_url}    
                                    // height="100px"
                                    width="75px"    
                                    onClick={props.onClick}
                                />
                            </Box>
                        )
                        
                    })
                }
            </Box>
            <Box>
                <Image
                    height="400px"
                    width="400px"
                    src={images[currImageIndex].secure_url} 
                    onClick={props.onClick}
                />
            </Box>
        </StyledComponent>
    )
}

export default Component;