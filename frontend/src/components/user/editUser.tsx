import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEditUserMutation } from "../../services/user.api"; // Define this API
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

interface FormData {
  name: string;
  email: string;
}

/**
 * EditProfile component allows the user to update their profile information, including name and email.
 * It uses react-hook-form for handling form validation and submission, with validation logic provided by yup.
 * Upon successful form submission, the user profile is updated via an API call, and the user is redirected to the profile page.
 *
 * @returns {JSX.Element} - The rendered Edit Profile page with form and error handling.
 */
const EditProfile: React.FC = () => {
  const { _id: userId, role } = useSelector(
    (state: RootState) => state.auth.user
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [updateUser, { isLoading }] = useEditUserMutation();

  /**
   * Handles the form submission.
   * It sends the updated profile data to the backend and navigates the user to the profile page upon success.
   *
   * @param {FormData} data - The form data containing the updated name and email.
   * @returns {Promise<void>} - A promise that resolves after the profile update request completes.
   */

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await updateUser({ id: userId, ...data }).unwrap();
      toast.success("Profile updated successfully");
      navigate("/profile");
      window.location.reload(); // Redirect back to the profile page
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProfile;
