import { Autocomplete, Chip, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiAutocomplete-inputRoot': {
      padding: 0,
      paddingRight: '16px'
    },
  },
  input: {
    '& input': {
      padding: '1px',
      paddingBottom: 0,
      marginTop: 1,
      marginBottom: 1,
    },
  },
}));


const Component = (props: any) => {
  const {
    label,
    options,
    value,
    changeHandler,
    required
  } = props;
  const classes = useStyles();

  return (
    <Autocomplete
      sx={{
        mt: 1
      }}
      options={options}
      getOptionLabel={(option) => option.name}
      onChange={changeHandler}
      value={value}
      renderInput={(params) => (
        <TextField
          required
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            classes: {
              root: classes.root,
              input: classes.input,
            }
          }}
        />
      )}
    />
  );
}

export default Component;