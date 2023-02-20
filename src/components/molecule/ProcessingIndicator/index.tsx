import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { STATUS } from '../../../type';
interface Props {
  state: STATUS;
  disabled?: boolean;
  initialText?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px'
  },
  success: {
    color: green[500],
  },
  failure: {
    color: red[500],
  },
}));

function ProcessingIndicator({ state, disabled = false, initialText = 'Inititate' }: Props): ReactElement {
  const classes = useStyles();

  let icon: ReactElement | undefined, text: string;

  switch (state) {
    case STATUS.NOT_STARTED:
      text = initialText;
      break;
    case STATUS.SUCCESS:
      icon = <CheckCircleIcon className={`${classes.icon} ${classes.success}`} />;
      text = 'Success';
      break;
    case STATUS.FAILED:
      icon = <ErrorIcon className={`${classes.icon} ${classes.failure}`} />;
      text = 'Failure';
      break;
    default:
      icon = <CircularProgress size={20} />;
      text = 'Processing...';
      break;
  }

  return (
    <div className={classes.root}>
      {icon}
      {text}
      {state === STATUS.NOT_STARTED && disabled && <span>&nbsp;&nbsp;Button disabled</span>}
    </div>
  );
}


export default ProcessingIndicator;
