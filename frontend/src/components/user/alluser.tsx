import React from "react";
import { useGetAllUsersQuery } from "../../services/user.api"; // Replace with your actual API file
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";

const AllUsers: React.FC = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();

  // Skeleton loading state
  if (isLoading) {
    return (
      <Box
        component="main"
        sx={{
          padding: 3,
          marginTop: "64px",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          All Users
        </Typography>

        {/* User List Grid - Skeleton Loading */}
        <Grid container spacing={3} justifyContent="center">
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={20}
                    sx={{ marginTop: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={20}
                    sx={{ marginTop: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) return <div>Error: Unable to fetch users</div>;

  // Validate data
  const users = Array.isArray(data?.data) ? data.data : [];

  if (users.length === 0) {
    return <div>No users available</div>;
  }

  return (
    <Box
      component="main"
      sx={{
        padding: 3,
        marginTop: "64px",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        All Users
      </Typography>

      {/* User List Grid */}
      <Grid container spacing={3} justifyContent="center">
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.email}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subscription: {user.subscription ? "Active" : "Inactive"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllUsers;
