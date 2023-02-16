import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Component = ({ children, loading, ...rest }) => {
  return (
    <Button {...rest} sx={{opacity: 0.5, pointerEvent: 'none'}}>
      {children}
      {loading && (
        <CircularProgress
          size={30}
          color="secondary"
          style={{ position: "absolute"}}
        />
      )}
    </Button>
  );
};

export default Component;
