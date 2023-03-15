import {useState} from 'react';
import { Button, TextField } from "@mui/material";
import ProcessingIndicator from '../../molecule/ProcessingIndicator';
import { STATUS } from '../../../type';
import { makeStyles } from '@material-ui/core/styles';
import { request, REQUEST_TYPE } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Component = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [processingStatus, setProcessingStatus] = useState<STATUS>(STATUS.NOT_STARTED);
    const [email, setEmail] = useState('');
    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProcessingStatus(STATUS.PROCESSING);
        const data = await request(
            REQUEST_TYPE.POST,
            `${process.env.REACT_APP_API_BASE_URL}/user/forgotPassword`,
            ''
            ,
            {
                email: email
            }
        );
        if(data?.success){
            setProcessingStatus(STATUS.SUCCESS);
        }else{
            setProcessingStatus(STATUS.FAILED);
        }
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
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    onChange={(event) => setEmail((event.target as HTMLInputElement).value)}
                />
                <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={processingStatus !== STATUS.NOT_STARTED} 
                    >
                        <ProcessingIndicator state={processingStatus} initialText={'Send link to mail'}/>
                    
                </Button>
            </form>
        </>
    )
}

export default Component;