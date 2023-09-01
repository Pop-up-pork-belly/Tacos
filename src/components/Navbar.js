import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/joy/Link";

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
    <div id="mainNav">
      <div id="navbartitle">
        E-Sports Collections
        <div id="navbarlink">
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            color="darkred"
            sx={{
              borderRadius: 1,
              boxShadow: 10,
              padding: 1,
              border: 2,
              borderColor: "black",
              ":hover": {
                bgcolor: "black",
                color: "white",
              },
            }}
          >
            Routines
          </Link>
          <Link
            component={RouterLink}
            to="/activities"
            underline="hover"
            color="darkred"
            sx={{
              borderRadius: 1,
              boxShadow: 10,
              padding: 1,
              border: 2,
              borderColor: "black",
              ":hover": {
                bgcolor: "black",
                color: "white",
              },
            }}
          >
            Activities
          </Link>
          {token ? (
            <Link
              component={RouterLink}
              to="/myroutines"
              underline="hover"
              color="darkblue"
              sx={{
                borderRadius: 1,
                boxShadow: 10,
                padding: 1,
                border: 2,
                borderColor: "black",
                ":hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
            >
              My Routines
            </Link>
          ) : null}
          {!token ? (
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              color="darkblue"
              sx={{
                borderRadius: 1,
                boxShadow: 10,
                padding: 1,
                border: 2,
                borderColor: "black",
                ":hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
            >
              Login
            </Link>
          ) : null}
          {!token ? (
            <Link
              component={RouterLink}
              to="/register"
              underline="hover"
              color="darkblue"
              sx={{
                borderRadius: 1,
                boxShadow: 10,
                padding: 1,
                border: 2,
                borderColor: "black",
                ":hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
            >
              Register
            </Link>
          ) : null}
          {token ? (
            <Link
              id="logout"
              onClick={logout}
              underline="hover"
              color="darkred"
              sx={{
                borderRadius: 1,
                boxShadow: 10,
                padding: 1,
                border: 2,
                borderColor: "black",
                ":hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
            >
              Logout
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
