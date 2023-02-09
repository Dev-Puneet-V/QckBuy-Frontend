import { styled } from "@mui/system";
import { Typography } from '@mui/material';
enum PositionType {
    Left,
    Right
}
interface PropsType {
    // text: String;
    icon: JSX.Element;
    iconPosition: PositionType;
    children: JSX.Element | String;
}

const StyledComponent = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '3px',
    color: 'black',
    marginLeft: '0.7rem',
    cursor: 'pointer'
});

const Component = (props: PropsType) => {
    const {
        // text,
        icon,
        iconPosition
    } = props;

    return (
        <StyledComponent>
            {
                iconPosition === PositionType.Left && icon
            }
            <Typography variant="subtitle2" color='dark'>
                {props.children}
            </Typography>   
            {
                iconPosition === PositionType.Right && icon
            }
        </StyledComponent>
    )
}

export default Component;
export {PositionType}