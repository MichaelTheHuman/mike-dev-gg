import { Box, Button, Link } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import ThemeSwitch from './ThemeSwitch';
import { LinkedIn } from "@mui/icons-material";
import { ThemeContext } from 'src/theme/ThemeProvider';
import { useContext } from 'react';


function HeaderButtons() {
  const setTheme = useContext(ThemeContext);
  return (
    <Box sx={{ mr: 1 }}>
      <ThemeSwitch 
        label=""
        checked={localStorage.getItem('appTheme') === "NebulaFighterTheme"}
        onChange={(e, v):void => {
          let theme = "PureLightTheme";
          if (v) {
            theme = "NebulaFighterTheme";
          }
          setTheme(theme)
        }} 
      />
      {/*<Link href="https://www.linkedin.com/in/mk9401/">*/}
      {/*  <LinkedIn />*/}
      {/*</Link>*/}
      {/*<HeaderSearch />*/}
      {/*<Box sx={{ mx: 0.5 }} component="span">*/}
      {/*  <HeaderNotifications />*/}
      {/*</Box>*/}
    </Box>
  );
}

export default HeaderButtons;
