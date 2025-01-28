import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import {
  useGetAllContentQuery,
  useDeleteContentMutation,
} from "../../services/content.api";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Skeleton,
} from "@mui/material";
import { toast } from "react-toastify";

const GetAllContents: React.FC = () => {
  const { role } = useAppSelector((state) => state.auth);

  /**
 * `GetAllContents` is a React functional component that fetches and displays a list of all content.
 * It also allows the admin user to create, update, or delete content.
 * 
 * @component
 * @returns {JSX.Element} The UI displaying the list of all contents with actions for update and delete.
 */

  const { data: contents, isLoading, isError,refetch } = useGetAllContentQuery();
  const [deleteContent, { isLoading: isDeleting }] = useDeleteContentMutation();
  const navigate = useNavigate();

  /**
   * Handle navigation to the content update page.
   * @param {string} contentId - The ID of the content to update.
   */
  const handleUpdate = (contentId: string) => {
    navigate(`/contents/update/${contentId}`);
  };

   /**
   * Handle the deletion of content.
   * @param {string} contentId - The ID of the content to delete.
   */
  const handleDelete = async (contentId: string) => {
    try {
      await deleteContent({ id: contentId }).unwrap();
      toast.success("Content deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete content");
    }
  };

  return (
    <Container>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="h4">All Contents</Typography>

        {/* "Create Content" button (Only visible for Admins) */}
        {role === "ADMIN" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/contents/create")}
            sx={{ maxHeight: "40px" }}
          >
            Create Content
          </Button>
        )}
      </Box>

      {/* Display loading skeletons while data is loading */}
      {isLoading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Typography variant="h6" color="error" sx={{ mt: 5 }}>
          Failed to load contents.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {contents?.data?.map((content) => (
            <Grid item xs={12} sm={6} md={4} key={content._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{content.title}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    {content.category}
                  </Typography>

                  {/* Buttons visible only for Admin */}
                  {role === "ADMIN" && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleUpdate(content._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(content._id)}
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

export default GetAllContents;
