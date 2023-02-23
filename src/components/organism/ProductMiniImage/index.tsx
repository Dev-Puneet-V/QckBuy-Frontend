import { useState } from "react";
import {
    Box, 
    Stack,
    useTheme,
    useMediaQuery
} from "@mui/material";
import Image from '../../atom/Image';
import { styled } from "@mui/system";

interface ProductMiniImagesPropsType {
  images: any[];
}


const ImageWrapper = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  opacity: 0.3,
  '&:hover': {
    opacity: 1
  },
  '&:not(:last-child)': {
    // marginBottom: theme.spacing(1),
    '@media (min-width: 600px)': {
      marginBottom: 0,
    //   marginRight: theme.spacing(1)
    }
  },
  '&.active': {
    opacity: 1
  }
}));

const Component = ({ images }: ProductMiniImagesPropsType) => {
  const [currImageIndex, setCurrentImageIndex] = useState<number>(0);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Stack
        direction={isMobileView ? 'column-reverse' : 'row'}
        spacing={1}
        justifyContent={isMobileView ? 'center' : 'end'}
        alignItems={isMobileView ? 'start' : 'center'}
        height="100%"
        width="100%"
    >
      <Stack 
        direction={isMobileView ? 'row' : 'column'}
        spacing={1}
        justifyContent="center"
        alignItems="center"
        height="100%"
        // width="100%"
    >
        {images?.map((currImage: any, index: number) => (
          <ImageWrapper
            key={currImage._id}
            onClick={() => handleImageClick(index)}
            className={currImageIndex === index ? 'active' : ''}
          >
            <Image
              id={currImage._id}
              src={currImage.secure_url}
              width={{ xs: '50px', sm: '75px' }}
            />
          </ImageWrapper>
        ))}
      </Stack>
      <Box sx={{ marginTop: '10px' }}>
        <Image
          height={{ xs: '200px', sm: '400px' }}
          width={isMobileView ? '100%' : '400px'}
          src={images[currImageIndex]?.secure_url}
        />
      </Box>
    </Stack>
  )
}

export default Component;
