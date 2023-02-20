import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import tabTheme from '../../../theme/tabTheme';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((themes) => ({
  [themes.breakpoints.down('sm')]: {
      tab: {
          fontSize: '13px',
          width: 'calc(100% / 3)'
      }
  },
})); 

interface TabType{
  value : string,
  label: string
}

interface Type{
  tabData: TabType[];
  stateHandler : Function;
}

const TabsWrappedLabel = ({tabData, ...props}: Type) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(tabData && tabData[0].value);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    props.stateHandler(newValue);
  };
  return (
    <Box sx={{ padding: '0px', borderColor: 'divider', width: '100%' }}>
    {/* <ThemeProvider theme={tabTheme}> */}
      <Tabs
      style={{display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '5px'}}
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        autoCapitalize="none"
        indicatorColor= "secondary"
        data-testid='tabs'
      >
        {
          tabData.map((currTab:TabType) => {
            return (
              <Tab 
                value={currTab.value} 
                label={currTab.label}  
                data-testid={`tab-${currTab.value}`} 
                sx={{maxWidth:'calc(100% / 3)', width: `calc(100% / 3)` , fontSize: '16px', borderBottom: '2px solid #E1ECFC', alignItems: 'start'}}  
                className={classes.tab}/>
            );
          })
        }
      </Tabs>
    {/* </ThemeProvider> */}
    </Box>
  );
}

export default TabsWrappedLabel;