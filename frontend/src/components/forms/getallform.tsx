import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { useGetAllFormsQuery, useDeleteFormMutation } from "../../services/form.api";
import { Container, Grid, Card, CardContent, Typography, Button, Box, Paper } from "@mui/material";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";

/**
 * `GetAllForms` is a React functional component that fetches and displays a list of forms.
 * It uses the `useGetAllFormsQuery` hook to fetch forms and the `useDeleteFormMutation` 
 * hook to handle the deletion of a form. It also conditionally renders buttons for updating 
 * and deleting forms if the user has the `ADMIN` role.
 * 
 * @component
 * @returns {JSX.Element} The UI for displaying a list of forms with options for updating or deleting.
 */
const GetAllForms: React.FC = () => {
  const { role } = useAppSelector((state) => state.auth);
  console.log({ role });

  const { data: forms, isLoading, isError,refetch } = useGetAllFormsQuery();
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();
  const navigate = useNavigate();

   /**
   * Navigates to the form update page when the "Update" button is clicked.
   * @param {string} formId - The ID of the form to update.
   */
  const handleUpdate = (formId: string) => {
    navigate(`/forms/update/${formId}`);
  };

  /**
   * Handles the form deletion when the "Delete" button is clicked.
   * @param {string} formId - The ID of the form to delete.
   */
  const handleDelete = async (formId: string) => {
    try {
      await deleteForm(formId).unwrap();
      toast.success("Form deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete form");
    }
  };

  return (
    <Container>
      {/* Header section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
        <Typography variant="h4">All Forms</Typography>

        {/* "Create Form" button (Only visible for Admins) */}
        {role === 'ADMIN' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/forms/create")}
            sx={{ maxHeight: '40px' }}
          >
            Create Form
          </Button>
        )}
      </Box>

      {/* Display loading skeletons while data is loading */}
      {isLoading ? (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Typography variant="h6" color="error" sx={{ mt: 5 }}>
          Failed to load forms.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {forms?.data?.map((form) => (
            <Grid item xs={12} sm={6} md={4} key={form._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{form.title}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {form.description}
                  </Typography>

                  {/* Buttons visible only for Admin */}
                  {role === "ADMIN" && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleUpdate(form._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(form._id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default GetAllForms;
