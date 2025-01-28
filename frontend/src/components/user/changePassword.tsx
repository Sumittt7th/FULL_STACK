import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useChangePasswordMutation } from "../../services/user.api"; // Adjust the path
import { toast } from "react-toastify";

// Validation Schema
const schema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * ChangePassword component allows the user to change their current password.
 * It uses react-hook-form for form handling and validation, along with yup for schema validation.
 * After submission, it calls an API to update the password and provides feedback via toast notifications.
 *
 * @returns {JSX.Element} - The rendered Change Password page with form and error handling.
 */
const ChangePassword: React.FC = () => {
  const { _id: userId } = useSelector((state: RootState) => state.auth.user);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  /**
   * Handles the form submission.
   * It sends the current and new passwords to the backend for changing the password.
   *
   * @param {FormData} data - The form data containing the current and new password values.
   * @returns {Promise<void>} - A promise that resolves after the password change is completed.
   */
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await changePassword({
        id: userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      reset(); // Reset the form fields after successful submission
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "Failed to change the password. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("currentPassword")}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
