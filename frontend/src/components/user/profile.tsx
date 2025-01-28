import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Adjust to your store file's path
import { useGetUserByIdQuery } from "../../services/user.api";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  // Retrieve the user ID from the Redux store
  const { _id: userId } = useSelector((state: RootState) => state.auth.user);

  if (!userId) {
    return <Typography>Error: User ID is missing.</Typography>;
  }

  // Fetch user details using the ID
  const { data, isLoading, isError } = useGetUserByIdQuery(userId);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton variant="text" width="60%" height={30} sx={{ mt: 2 }} />
          <Skeleton variant="text" width="60%" height={30} sx={{ mt: 2 }} />
          <Skeleton variant="text" width="60%" height={30} sx={{ mt: 2 }} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{ mt: 3 }}
          />
        </Paper>
      </Container>
    );
  }

  if (isError || !data) {
    return <Typography>Error fetching user details!</Typography>;
  }

  const user = data.data; // Access the `data` field inside the response

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            Name:
          </Typography>
          <Typography variant="body1">{user.name}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            Email:
          </Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            Role:
          </Typography>
          <Typography variant="body1">{user.role}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/editUser`)}
        >
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default UserProfile;
