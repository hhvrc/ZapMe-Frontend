import { Toolbar, AppBar, Button } from "@mui/material";
import 'Assets/Styles/App.css';
import { NavLink } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <AppBar>
        <Toolbar>
            <Button color="inherit" component={NavLink} to="/" sx={{ fontSize: 20, fontWeight: 'bold', textTransform: 'none' }}> ZapMe </Button>
            <Button color="inherit" component={NavLink} to="/signin" sx={{ fontSize: 20, fontWeight: 'bold', textTransform: 'none' }}> Sign In </Button>
            <Button color="inherit" component={NavLink} to="/signup" sx={{ fontSize: 20, fontWeight: 'bold', textTransform: 'none' }}> Sign Up </Button>
        </Toolbar>
    </AppBar>
  );
}

export default Header;