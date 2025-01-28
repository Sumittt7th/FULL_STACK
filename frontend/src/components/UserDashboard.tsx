import React from "react";
import { Box, Typography, Paper, Skeleton } from "@mui/material";

const UserDashboard: React.FC = () => {
  // Placeholder loading state
  const isLoading = false; // Change to true for skeleton loading effect

  return (
    <Box
      component="main"
      sx={{
        padding: 3,
        marginTop: "64px",
        bgcolor: "background.default",
      }}
    >
      {/* Welcome Message */}
      <Typography variant="h4" gutterBottom>
        Welcome to the User Dashboard
      </Typography>

      {/* Info Section */}
      <Paper sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Dashboard Overview
        </Typography>
        {isLoading ? (
          <Skeleton variant="text" width="80%" height={40} />
        ) : (
          <Typography variant="body1" color="textSecondary">
            Here you can manage your account and view your activities.
          </Typography>
        )}
      </Paper>

      {/* Stats Section */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        {isLoading ? (
          <Skeleton variant="text" width="50%" height={30} />
        ) : (
          <Typography variant="body1" color="textSecondary">
            Get insights into your activity and progress here.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default UserDashboard;
