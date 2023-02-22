
import { createTheme, } from "@mui/material/styles";
const headerTheme = createTheme({
    palette: {
      primary: {
        main: "#2196f3",
      },
    },
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    spacing: (factor) => `${0.5 * factor}rem`,
  });

export default headerTheme;