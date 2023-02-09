import { styled } from "@mui/system";
import { Box } from '@mui/material';
import Card from '../../organism/Card';
const StyledComponent = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'center',
    alignContent: 'center',
    height: 'calc(100vh-50px)',
    flexWrap: 'wrap',
    overyflowY: 'scroll'
});

const Component = (props: any) => {
    return (
        <StyledComponent>
            {
                props.products && props.products.map((currProduct: any) => {
                   return (
                        <Box sx={{
                           margin: '5px' 
                        }}>
                            <Card product={currProduct}/>
                        </Box>
                    )
                })
            }
        </StyledComponent>
    )
}

export default Component;