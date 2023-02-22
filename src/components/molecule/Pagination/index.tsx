import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));
interface PaginationPropsType {
    currentPage: number;
    totalPages: number;
    onChange:  (value: number) => void;
}
const Component = (props: PaginationPropsType) => {
  const classes = useStyles();
  const { currentPage, totalPages, onChange } = props;

  const handleChange = (event: any, value: number) => {
    onChange(value);
  };

  return (
    <div className={classes.root}>
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
    </div>
  );
}

export default Component;