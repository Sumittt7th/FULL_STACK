import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid, Link } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { resetTokens } from "../../store/reducers/authReducer";
import { clearTokens } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/user.api";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling

const Navbar: React.FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(resetTokens());
      clearTokens();
      toast.success("Logout Successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div">
              <Link href="/home" color="inherit" underline="none">
                MyWebsite
              </Link>
            </Typography>
          </Grid>

          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/home"
                  activeClassName="active-link"
                >
                  Home
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/about"
                  activeClassName="active-link"
                >
                  About
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/contact"
                  activeClassName="active-link"
                >
                  Contact
                </Button>
              </Grid>
              {isAuthenticated && (
                <Grid item>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to="/dashboard"
                    activeClassName="active-link"
                  >
                    Dashboard
                  </Button>
                </Grid>
              )}
              <Grid item>
                {isAuthenticated ? (
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button color="inherit" href="/auth">
                    Login
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
