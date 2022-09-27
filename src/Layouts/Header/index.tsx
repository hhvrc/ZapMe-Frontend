import { Toolbar, AppBar, Typography } from "@mui/material";
import 'Assets/Styles/App.css';

function Header(): JSX.Element {
  return (
    <AppBar>
        <Toolbar>
            <Typography fontSize={32} fontWeight="bold"> ZapMe (Make this clickable NavLink component that redirects to "/") </Typography>
        </Toolbar>
    </AppBar>
  );
}

export default Header;