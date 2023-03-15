import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { STATUS } from '../../../type';
import { request } from '../../../hooks';
import { UPDATE_USER_REQUEST } from '../../../contant/url';
import { useCookies } from 'react-cookie';
import ProcessingIndicator from '../../molecule/ProcessingIndicator';
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#F5F5F5',
      height: '100%',
      width: 'calc(80vw)',
      margin: 'auto',
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      paddint: theme.spacing(1)
    //   justifyContent: 'center',
    },
    error: {
        fontSize: '10px',
        marginTop: '-10px'
    },
    formContainer: {
        // maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
        margin: 'auto'
      },
    form: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        width: '400px',
    },
    input: {
        marginBottom: theme.spacing(2),
        backgroundColor: '#fff',
        color: '#000',
        padding: '1px',
        borderRadius: '5px',
    },
    button: {
        marginTop: theme.spacing(2),
        borderRadius: '5px',
        fontWeight: 'bold',
    },
  }));
const UserProfile = () => {
  const classes = useStyles();

  const [cookies] = useCookies(['token', 'user']);
  const [processingState, setProcessingState] = useState<STATUS>(STATUS.NOT_STARTED);
  const [formData, setFormData] = useState({
    name: cookies.user.name,
    email: cookies.user.email,
    photo: cookies.user.photo?.secure_url || '',
    phoneNumber: cookies.user.address?.phoneNumber || '',
    exactAddress: cookies.user.address?.exactAddress || '',
    postalCode: cookies.user.address?.postalCode || '',
    region: cookies.user.address?.region || '',
    city: cookies.user.address?.city || '',
    country: cookies.user.address?.country || '',
    password: null,
    confirmPassword: null,
  });
  const initailErrorsState = {
    name: null,
    email: null,
    photo: null,
    phoneNumber: null,
    exactAddress: null,
    postalCode: null,
    region: null,
    city: null,
    country: null,
    password: null,
    confirmPassword: null,
  }
  const [errors, setErrors] = useState(initailErrorsState);
  const handleInputChange = (event) => {
    const currValue = event.target.value;
    switch (event.target.name){
        case 'name':
            const nameRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*\s+[a-zA-Z]+(?:-[a-zA-Z]+)*$/
            if (!(nameRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  name: 'Please enter a valid name with valid name',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    name: null,
                  }));
              }
            break;
        case 'email':
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (!(emailRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  email: 'Please enter a valid email example@gmail.com'
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    email: null,
                  }));
              }
            break;
        case 'phoneNumber':
            const phoneRegex = /^[1-9][0-9]{9}$/
            if (!(phoneRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  phoneNumber: 'Please enter a valid 10-digit phone number',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    phoneNumber: null,
                  }));
              }
            break;
        case 'exactAddress':
            const addressRegex = /^[a-zA-Z0-9]+$/
            if (!(addressRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  exactAddress: 'Please enter valid address',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    exactAddress: null,
                  }));
              }
            break;
        case 'postalCode':
            const postalCodeRegex = /^[.]+$/
            if (!(postalCodeRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  postalCode: 'Please enter valid postal code',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    postalCode: null,
                  }));
              }
            break;
        case 'region':
            const regionRegex = /^[a-zA-Z]+$/
            if (!(regionRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  region: 'Please enter valid address region',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    region: null,
                  }));
              }
            break;
        case 'city':
            const cityRegex = /^[a-zA-Z]+$/
            if (!(cityRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  city: 'Please enter valid city',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    city: null,
                  }));
              }
            break;
        case 'country':
            const countryRegex = /^[a-zA-Z]+$/
            if (!(countryRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  country: 'Please enter valid country',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    country: null,
                  }));
              }
            break;
        case 'password':
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_])(?!.*\s).{8,}$/
            if (!(passwordRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    password: null,
                  }));
              }
            break;
        case 'confirmPassword':
            const confirmPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_])(?!.*\s).{8,}$/
            if (!(confirmPassRegex.test(currValue))) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  confirmPassword: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
                }));
              }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    confirmPassword: null,
                  }));
              }
            if(currValue !== formData.password){
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    confirmPassword: 'Password and Confirm password must match',
                  }));
            }else{
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    confirmPassword: null,
                  }));
            }
            break; 
    }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setProcessingState(STATUS.PROCESSING);
    const data = await request(
        UPDATE_USER_REQUEST.type,
        UPDATE_USER_REQUEST.url,
        cookies.token,
        {
            ...formData
        }
    );
    setProcessingState(data?.success ? STATUS.SUCCESS: STATUS.FAILED);
    if(data?.success){
        // setTimeout(() => {
        //     // setProcessingState(STATUS.NOT_STARTED);
        // }, 10000);
    }
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
        <div className={classes.formContainer}>
            <form onSubmit={handleFormSubmit} className={classes.form}>
                
                {errors.name && <Typography className={classes.error} color='error'>{errors.name}</Typography>}
                <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={classes.input}
                required
                fullWidth
                />
                
                {errors.email && <Typography className={classes.error} color='error'>{errors.email}</Typography>}
                <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={classes.input}
                required
                fullWidth
                />
                
                {errors.phoneNumber && <Typography className={classes.error} color='error'>{errors.phoneNumber}</Typography>}
                <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={classes.input}
                fullWidth
                />
                
                {errors.exactAddress && <Typography className={classes.error} color='error'>{errors.exactAddress}</Typography>}
                <TextField
                label="Exact Address"
                name="exactAddress"
                value={formData.exactAddress}
                onChange={handleInputChange}
                className={classes.input}
                fullWidth
                />
                
                {errors.postalCode && <Typography className={classes.error} color='error'>{errors.postalCode}</Typography>}
                <TextField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className={classes.input}
                required
                fullWidth
                />
                
                {errors.region && <Typography className={classes.error} color='error'>{errors.region}</Typography>}
                <TextField
                label="Region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className={classes.input}
                required
                fullWidth
                />
                
                {errors.city && <Typography className={classes.error} color='error'>{errors.city}</Typography>}
                <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={classes.input}
                required
                fullWidth
                />
                
                {errors.country && <Typography className={classes.error} color='error'>{errors.country}</Typography>}
                <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={classes.input}
                required
                fullWidth
                />
{/*                 
                {errors.password && <Typography className={classes.error} color='error'>{errors.password}</Typography>}
                <TextField
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={classes.input}
                fullWidth
                />
                
                {errors.confirmPassword && <Typography className={classes.error} color='error'>{errors.confirmPassword}</Typography>}
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={classes.input}
                    required={formData.password !== null}
                    fullWidth
                    /> */}
                    <Button variant='contained' disabled={processingState !== STATUS.NOT_STARTED} color='primary' className={classes.button} type='submit' fullWidth>
                        <ProcessingIndicator state={processingState} initialText={`Save Changes`}/>
                    </Button>
                </form>
        </div>
    </Container>
        );
        };

export default UserProfile;