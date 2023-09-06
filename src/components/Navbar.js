import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/joy/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/joy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    console.log("You are now Logged out!");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  return (
    <AppBar
      className="nav-bar"
      position="static"
      sx={{ marginBottom: "20px", backgroundColor: "black" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          E-Sports Collections
        </Typography>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            Home
          </Button>

          <Button
            component={RouterLink}
            to="/Products"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            Products
          </Button>

          {/* only admin can view this tab (come back ) */}
          <Button
            component={RouterLink}
            to="/Admin"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            Admin
          </Button>

          {token ? (
            <Button
              component={RouterLink}
              to="/Profile"
              color="inherit"
              sx={{ marginRight: 2 }}
            >
              Teams
            </Button>
          ) : null}
          {!token ? (
            <>
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                Register
              </Button>
            </>
          ) : null}
          {token ? (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          ) : null}

          <Button
            component={RouterLink}
            to="/cart"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            <ShoppingCartIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
