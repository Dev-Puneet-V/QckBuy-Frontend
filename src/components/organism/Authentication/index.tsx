import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { STATUS, USER_AUTHENTICATION_TAB_DATA } from '../../../type';
import Tabs from '../../molecule/Tabs';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from '../../../contant/url';
import { request } from '../../../hooks';
import { checkEmailValidation, checkNameValidation, checkNumberValidation, checkPasswordValidation, checkPhoneNumberValidation } from '../../../validatorHooks';
import ProcessingIndicator from '../../molecule/ProcessingIndicator';
import { Country, State, City }  from 'country-state-city';
import TypeAheadInput from '../../molecule/TypeAheadInput';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const useStyles = makeStyles((theme) => ({
    parent: {
        display: 'flex',
        justifyItems:'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        margin: 'auto',
        position: 'relative'
    },
    root: {
        // maxWidth: '1200px',
        margin: `${theme.spacing(2)} auto`,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyItems:'center',
        maxHeight: '1000px',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        postion: 'fixed',
        top: '50px'
    },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    // maxHeight: '500px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: '#999999 #f5f5f5',
    '&::-webkit-scrollbar': {
        width: '10px',
        height: '150px',
        display: 'inline',
    },
    '&::-webkit-scrollbar-track': {
    // backgroundColor: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
    borderLeft: '4px white solid',
    backgroundClip: 'padding-box'
    },
    '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const addressSchema = {
  exactAddress: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  phoneNumber: ''
};

const Component = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [processingStatus, setProcessingState] = React.useState<STATUS>(STATUS.NOT_STARTED)
  const [tabState, setTabState] = React.useState<string>(USER_AUTHENTICATION_TAB_DATA[0].value);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [isApplyingForJob, setIsApplyingForJob] = React.useState(false);
  const [role, setRole] = React.useState('');
  const [address, setAddress] = React.useState(addressSchema);
  const [cookies, setCookie] = useCookies(['token']);
  const handleTabState = (currTabState: string) => {
    setTabState(currTabState);
}

React.useEffect(() => {
    if (cookies.token) {
        navigate('/');
    } else if (processingStatus === STATUS.FAILED) {
      navigate('/login');
    }
  }, [navigate, processingStatus, cookies]);

  const handleAddressChange = (event) => {
    setAddress({
      ...address,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    });
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
    } else {
      setPhoto(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(tabState === USER_AUTHENTICATION_TAB_DATA[0].value){
        const isPasswordValid = Boolean(checkPasswordValidation(password) || true);
        const isEmailValid = Boolean(checkEmailValidation(email) || true);
        try{
        if(isPasswordValid && isEmailValid){
            setProcessingState(STATUS.PROCESSING);
            const data = await request(
                LOGIN_REQUEST.type,
                LOGIN_REQUEST.url,
                cookies.token,
                {
                    "email": email,
                    "password": password
                }
            );
            setProcessingState(data.success ? STATUS.SUCCESS: STATUS.FAILED);
            if(data.success){
                setTimeout(() => {
                    setProcessingState(STATUS.NOT_STARTED);
                    setCookie('token', data.token, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) });
                }, 100);
            }
        } 
    }catch(error){
            console.log(error)
        }
    }else{
        const isPasswordValid = Boolean(checkPasswordValidation(password) || true);
        const isEmailValid = Boolean(checkEmailValidation(email) || true);
        const isNameValid = Boolean(checkNameValidation(name) || true);
        // postalCode, region, city, country, exactAddress, phoneNumber, applicationFor
        const isPostalCodeValid = Boolean(checkNumberValidation(address.postalCode)  ? false : true);
        const isRegionValid = Boolean(checkNameValidation(address.state) ? false : true);
        const isCityValid = Boolean(checkNameValidation(address.city) ? false : true);
        const isCountryValid = Boolean(checkNameValidation(address.country) ? false : true);
        const isPhoneNumberValid = Boolean(checkPhoneNumberValidation(address.phoneNumber) ? false : true);
        // if(isPasswordValid && isEmailValid && isNameValid && isRegionValid && isCityValid && isPhoneNumberValid && isCountryValid && isPostalCodeValid){
            setProcessingState(STATUS.PROCESSING);
            try{
            const data = await request(
                SIGNUP_REQUEST.type,
                SIGNUP_REQUEST.url,
                cookies.token,
                {
                    "email": email,
                    "password": password,
                    "name": name,
                    "exactAddress": address.exactAddress,
                    "region": address.state,
                    "city": address.city,
                    "applicationFor": (role && (role === 'manager' || role === 'employee')) ? role : undefined,
                    "phoneNumber": '+' + country?.phoneCode + ' ' + address.phoneNumber,
                    "country": address.country,   
                    "postalCode": address.postalCode
                }
            );
            setProcessingState(data.success ? STATUS.SUCCESS: STATUS.FAILED);
            if(data.success){
                setTimeout(() => {
                    setProcessingState(STATUS.NOT_STARTED);
                    setCookie('token', data.token, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) });
                }, 100);
            }
        }catch(error){
            console.log(error)
        }
        // }else{
        //     console.log({
        //         "email": email,
        //         "password": password,
        //         "name": name,
        //         "exactAddress": address.exactAddress,
        //         "region": address.state,
        //         "city": address.city,
        //         "applicationFor": (role && (role === 'manager' || role === 'employee')) ? role : undefined,
        //         "phoneNumber": '+' + country?.phoneCode + ' ' + address.phoneNumber,
        //         "country": address.country,   
        //     })
        // }
    } 
  };

  const countryList = Country.getAllCountries();
  const [country, setCountry] = React.useState<any>();
  const handleCountry = (event: React.ChangeEvent<{}>, newValue: any) => {
    setCountry(newValue);
    setAddress({
        ...address,
        'country': newValue.name,
      });
  };
  const [state, setState] = React.useState<any>();
  const handleState = (event: React.ChangeEvent<{}>, newValue: any) => {
    setState(newValue);
    setAddress({
        ...address,
        'state': newValue.name,
      });
  };
  const [city, setCity] = React.useState<any>();
  const handleCity = (event: React.ChangeEvent<{}>, newValue: any) => {
    setCity(newValue);
    setAddress({
        ...address,
        'city': newValue.name,
      });
  };
  return (
        <Container component="main" className={classes.parent}>
            <Container component="main" className={classes.root}>
            <Tabs tabData={USER_AUTHENTICATION_TAB_DATA} stateHandler={handleTabState}/>
            <div className={classes.paper}>
            {
                tabState === USER_AUTHENTICATION_TAB_DATA[0].value && 
                <>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            size='small'
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail((event.target as HTMLInputElement).value)}
                        />
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
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword((event.target as HTMLInputElement).value)}
                        />
                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={processingStatus !== STATUS.NOT_STARTED} 
                        >
                            <ProcessingIndicator state={processingStatus} initialText={USER_AUTHENTICATION_TAB_DATA[0].value}/>
                        </Button>
                    </form>
                </>
            }
            {
                tabState === USER_AUTHENTICATION_TAB_DATA[1].value && 
                
                <>
                    <form className={classes.form} onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(event) => setEmail((event.target as HTMLInputElement).value)}
                />
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
                    autoComplete=""
                    value={password}
                    onChange={(event) => setPassword((event.target as HTMLInputElement).value)}
                />
                    <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="text"
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName((event.target as HTMLInputElement).value)}
                />
                <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="photo"
                    label="Photo"
                    type="file"
                    id="photo"
                    autoComplete="photo"
                    // value={!photo ? null : photo}
                    InputLabelProps={{ shrink: true }}  
                    inputProps={{
                        accept: "image/*",
                        required: true,
                        onChange: handlePhotoChange
                    }}
                />
                <TypeAheadInput 
                    options={countryList} 
                    value={country} 
                    changeHandler={handleCountry} 
                    label={'Country'} 
                    required={true}
                />
                <TypeAheadInput 
                    options={State.getStatesOfCountry(country?.isoCode)} 
                    value={state} 
                    changeHandler={handleState} 
                    label={'State'} 
                    required={true}
                />
                <TypeAheadInput
                    options={City.getCitiesOfState(country?.isoCode, state?.isoCode)} 
                    value={city} 
                    changeHandler={handleCity} 
                    label={'City'} 
                    required={true}
                />
                <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="postalCode"
                    label="Postal Code"
                    type="text"
                    id="postalCode"
                    autoComplete="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                />
                <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="street"
                    label="Street"
                    type="text"
                    id="street"
                    autoComplete="street"
                    value={address.street}
                    onChange={handleAddressChange}
                />
                <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="exactAddress"
                    label="Exact location"
                    type="text"
                    id="exactAddres"
                    autoComplete="exactAddres"
                    value={address.exactAddress}
                    onChange={handleAddressChange}
                />
                <TextField
                    id="mobile"
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    name="phoneNumber"
                    value={address.phoneNumber}
                    onChange={handleAddressChange}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Typography variant="body1">+{country ? country?.phonecode : '91'}</Typography>
                        </InputAdornment>
                        ),
                        // inputComponent: NumberFormatCustom,
                    }}
                    inputProps={{
                        maxLength: 10,
                        minLength: 10,
                        type: "number"
                    }}
                    />
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={isApplyingForJob}
                        onChange={(event) =>
                            setIsApplyingForJob((event.target as HTMLInputElement).checked)
                        }
                        name="isApplyingForJob"
                        color="primary"
                        />
                    }
                    label="Are you applying for a job?"
                />
                
                {isApplyingForJob && (
                    
                    <FormControl sx={{ mt: 1, mb: 1}}>
                        <InputLabel id="role">Role</InputLabel>
                        <Select
                            required={true}
                            labelId='role'
                            label='Role'
                            placeholder='Role'
                            value={role}
                            style={{
                                width: 300
                            }}
                            onChange={(e) => {
                                setRole((e.target as HTMLInputElement).value)
                            }}
                        >
                            <MenuItem value={'employee'} sx={{width: '100%'}}>
                                Delivery Person
                            </MenuItem>
                            <MenuItem value={'manager'} sx={{width: '100%'}}>
                                Manager
                            </MenuItem>
                        </Select>
                    </FormControl>
                )}
                <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // className={classes.submit}
                    disabled={processingStatus !== STATUS.NOT_STARTED} 
                >
                    <ProcessingIndicator state={processingStatus} initialText={USER_AUTHENTICATION_TAB_DATA[1].value}/>
                </Button>
            </form>
            </>
            }
            </div>
            </Container>
        </Container>
  );
}

export default Component;