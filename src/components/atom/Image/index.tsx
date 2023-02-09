import {Box} from '@mui/material';
const ImageComponent = (props:any) => {
    return (
      <Box {...props} alt="not found" component="img" />
    );
}

export default ImageComponent;