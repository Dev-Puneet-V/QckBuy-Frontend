import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment/moment.js'
import AlertDialog from '../AlertDialog';
import { REQUEST_TYPE, request } from '../../../hooks';
import { STATUS } from '../../../type';
import ProcessingIndicator from '../ProcessingIndicator';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1)
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  id: {
    color: theme.palette.text.secondary,
  },
  email: {
    color: theme.palette.text.secondary,
  },
  button: {
    opacity: 0.5,
  },
  success: {
    color: theme.palette.success.main,
  },
  failure: {
    color: theme.palette.error.main,
  },
}));

const EmployeeCard = (props: any) => {
  const {
    negateEmployee,
    handleClose,
    employeeType,
    verifyEmployee
  } = props;
  const { photo, _id, name, address, createdAt, email, applicationFor } = props.employee;
  const classes = useStyles();
  const [deletionConfirmationModalIsOpen, setDeletionConfirmationModalOpenStatus] = React.useState(false);
  const [processingStatus, setProcessingStatus] = React.useState<STATUS>(STATUS.NOT_STARTED)
    const handleDeletionConfirmationOpen = () => {
    setDeletionConfirmationModalOpenStatus(true);
  };
  const handleDeletionClose = () => {
    setDeletionConfirmationModalOpenStatus(false);
  };
  const handleDeletionConfirationClose = async () => {
    setDeletionConfirmationModalOpenStatus(false);
    setProcessingStatus(STATUS.PROCESSING);
    const data = await request(
        REQUEST_TYPE.PUT,
        `${process.env.REACT_APP_API_BASE_URL}/user/admin/user/${_id}`,
        process.env.REACT_APP_ADMIN_TOKEN,
        {
            role: 'ex-'+employeeType
        }
    )
    if(data.success){
        setProcessingStatus(STATUS.SUCCESS);
        negateEmployee();
        handleClose();
    }else{
        setProcessingStatus(STATUS.FAILED);
    }
  };
  const handleVerificationConfirmationOpen = async () => {
    setProcessingStatus(STATUS.PROCESSING);
    const data = await request(
        REQUEST_TYPE.PUT,
        `${process.env.REACT_APP_API_BASE_URL}/user/verify/${_id}`,
        process.env.REACT_APP_ADMIN_TOKEN,
        {
          conversionFor: applicationFor
        }
    )
    if(data.success){
        setProcessingStatus(STATUS.SUCCESS);
        verifyEmployee();
        handleClose();
    }else{
        setProcessingStatus(STATUS.FAILED);
    }
  };
  return (
    <>
    {props.employee && <Card className={classes.root} key={_id}>
      <Avatar alt={name} src={photo.secure_url} className={classes.avatar} />
      <CardContent className={classes.info}>
        <Typography variant="h5" component="h2">
          <b>{name}</b>
        </Typography>
        <Typography className={classes.id} gutterBottom>
          <b>ID: </b>{_id}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Address: </b>{address.exactAddress}, {address.postalCode}, {address.region}, {address.city}, {address.country}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>{applicationFor ? 'Application received on: ' : 'Joined on: '}</b> {moment(createdAt).format("MMMM Do YYYY")}
        </Typography>
        <Typography className={classes.email} variant="body2" component="p">
          <b>Gmail: </b>{email}
        </Typography>
        <Typography className={classes.email} variant="body2" component="p">
          <b>Phone no: </b>{address?.phoneNumber}
        </Typography>
        {
          applicationFor &&
          <Typography className={classes.email} variant="body2" component="p">
            <b>Application for: </b>{applicationFor}
        </Typography>
        }
      {
       (employeeType === 'employee' || employeeType === 'manager') && 
       <Button variant='contained' style={{marginTop: 1, width: '200px'}} onClick={handleDeletionConfirmationOpen} disabled={processingStatus !== STATUS.NOT_STARTED} color='primary'>
            <ProcessingIndicator state={processingStatus} initialText={`Delete ${employeeType}`}/>
        </Button>
      }
      {
       employeeType === 'applicant' && applicationFor &&
       <Button variant='contained' onClick={handleVerificationConfirmationOpen} disabled={processingStatus !== STATUS.NOT_STARTED} color='primary'>
            <ProcessingIndicator state={processingStatus} initialText='Verify user'/>
        </Button>
      }
      </CardContent>
    </Card>}
    {
        <AlertDialog 
            open={deletionConfirmationModalIsOpen}
            handleClose={handleDeletionClose}
            handleConfirm={handleDeletionConfirationClose}
            title={employeeType.charAt(0).toUpperCase() + employeeType.slice(1) + ' deletion confirmation'}
            description={`This action will delete this ${employeeType}. Click on CONFIRM to proceed`}  
        />
    }
    </>
  );
  
};

export default EmployeeCard;
