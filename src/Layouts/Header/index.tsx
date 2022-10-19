import { Box, Toolbar, AppBar, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <AppBar position="sticky" sx={{ flexGrow: 1 }}>
      <Toolbar>
          <Button
            color="inherit"
            component={NavLink}
            to="/"
            sx={{ fontSize: 20, fontWeight: 'bold', textTransform: 'none' }}
          >
            ZapMe
          </Button>
          <Box mx={{ flexGrow: 1 }}/>
          <Button
            color="inherit"
            component={NavLink}
            to="/signin"
            sx={{ fontSize: 20, fontWeight: 'bold', textTransform: 'none' }}
          >
            Login
          </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;