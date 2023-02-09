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
    text?: String | null | number;
    sx?: any;
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
        text,
        icon,
        iconPosition,
        ...remainingProp
    } = props;

    return (
        <StyledComponent>
            {
                iconPosition === PositionType.Left && icon
            }
            <Typography variant="subtitle2" color='dark' {...remainingProp}>
                {text}
            </Typography>   
            {
                iconPosition === PositionType.Right && icon
            }
        </StyledComponent>
    )
}

export default Component;
export {PositionType}