import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Paper, Box, Link } from "@mui/material";
import { useLoginMutation, useSignUpMutation } from "../../services/auth.api";
import { useAppDispatch } from "../../store/store";
import { setTokens } from "../../store/reducers/authReducer";
import { saveTokens } from "../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  name?: string; // Used for signup
}

/**
 * AuthPage component is responsible for handling the authentication flow of users, including login and signup.
 * It displays a form that switches between login and signup modes based on user interaction.
 * 
 * @returns {JSX.Element} - The rendered authentication page JSX.
 */
const AuthPage: React.FC = () => {
  /**
   * State variable to track whether the form is in 'login' or 'signup' mode.
   * Defaults to 'login' mode.
   *
   * @type {('login' | 'signup')}
   */
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>();

  /**
   * Mutation hook for logging in a user.
   * It provides loading state, and handles the API call to log in.
   *
   * @type {function}
   */

  const [login, { isLoading: loginLoading }] = useLoginMutation();

  /**
   * Mutation hook for signing up a user.
   * It provides loading state, and handles the API call to register a new user.
   *
   * @type {function}
   */
  const [signup, { isLoading: signupLoading }] = useSignUpMutation();

  /**
   * Handles form submission for both login and signup forms.
   * It performs the appropriate action based on the active form (login or signup).
   *
   * @param {FormData} data - The form data containing the email, password, and optional name (for signup).
   * @returns {Promise<void>} - A promise that resolves when the login/signup process is complete.
   */

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (activeForm === "login") {
      try {
        const response = await login({
          email: data.email,
          password: data.password,
        }).unwrap();
        dispatch(setTokens(response.data));
        saveTokens(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.role
        );

        toast.success("Login Successful");
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed. Please try again.");
      }
    } else if (activeForm === "signup") {
      try {
        await signup({
          name: data.name!,
          email: data.email,
          password: data.password,
        }).unwrap();
        toast.success("Signup Successful. Please login.");
        setActiveForm("login");
      } catch (error) {
        console.error("Signup failed:", error);
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: "2rem auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {activeForm === "login" ? "Login" : "Sign Up"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeForm === "signup" && (
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name")}
          />
        )}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={loginLoading || signupLoading}
        >
          {activeForm === "login" ? "Login" : "Sign Up"}
        </Button>
      </form>

      <Box mt={2}>
        {activeForm === "login" && (
          <>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                component="button"
                onClick={() => setActiveForm("signup")}
                sx={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Sign Up
              </Link>
            </Typography>
            <Typography variant="body2" mt={1}>
              <Link
                component="button"
                onClick={() => navigate("/forgot-password")}
                sx={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Forgot Password?
              </Link>
            </Typography>
          </>
        )}
        {activeForm === "signup" && (
          <Typography variant="body2">
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => setActiveForm("login")}
              sx={{ textDecoration: "none", fontWeight: "bold" }}
            >
              Login
            </Link>
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AuthPage;
