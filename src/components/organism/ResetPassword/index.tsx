import {useState} from 'react';
import { Button, TextField } from "@mui/material";
import ProcessingIndicator from '../../molecule/ProcessingIndicator';
import { STATUS } from '../../../type';
import { makeStyles } from '@material-ui/core/styles';
import { request, REQUEST_TYPE } from '../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Component = () => {
    const {
        id
    } = useParams();
    console.log("Helllo")
    const classes = useStyles();
    // const navigate = useNavigate();
    const [processingStatus, setProcessingStatus] = useState<STATUS>(STATUS.NOT_STARTED);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const init = async () => {
        setProcessingStatus(STATUS.NOT_STARTED);
        setPassword('');
        setConfirmPassword('');
    }
    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProcessingStatus(STATUS.PROCESSING);
        const data = await request(
            REQUEST_TYPE.POST,
            `${process.env.REACT_APP_API_BASE_URL}/user/password/reset/${id}`,
            ''
            ,
            {
                password: password,
                confirmPassword: confirmPassword
            }
        );
        if(data.success){
            console.log('Helllo')
            setProcessingStatus(STATUS.SUCCESS);
            // navigate('/');
        }else{
            setProcessingStatus(STATUS.FAILED);
        }
        await init();
    }
    return (
        <>
            <form onSubmit={submitHandler}>
            <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    onChange={(event) => setPassword((event.target as HTMLInputElement).value)}
                />
                <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm password"
                    type="password"
                    id="condfirmPassword"
                    onChange={(event) => setConfirmPassword((event.target as HTMLInputElement).value)}
                />
                <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={processingStatus !== STATUS.NOT_STARTED} 
                    >
                        <ProcessingIndicator state={processingStatus} initialText={'Proceed'}/>
                    
                </Button>
            </form>
        </>
    )
}

export default Component;