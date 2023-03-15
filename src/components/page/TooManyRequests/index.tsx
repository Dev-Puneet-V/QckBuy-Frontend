import React from 'react';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  message: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  progress: {
    color: theme.palette.primary.main,
  },
}));

const TooManyRequests = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.message}>
        Too Many Requests in 1 hour
      </Typography>
      <Typography variant="body1" className={classes.message}>
        Please try again later.
      </Typography>
      <CircularProgress size={48} className={classes.progress} />
    </Box>
  );
};

export default TooManyRequests;
