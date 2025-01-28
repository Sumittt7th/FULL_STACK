import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

const AdminDashboard: React.FC = () => {
  // Example data that could be fetched from an API
  const userCount = 1200;
  const reviewCount = 350;
  const activeUsers = 850;
  const totalRevenue = "$10,500";

  // Assuming data is being fetched here, for demonstration purposes we set loading state to false
  const isLoading = false; // Set this to true while data is being fetched

  // Skeleton Loading State
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
          Admin Dashboard
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Manage users, track platform statistics, and monitor analytics here.
        </Typography>

        {/* Dashboard Stats Grid - Skeletons */}
        <Grid container spacing={2} justifyContent="center">
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={50}
                    sx={{ marginTop: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}>
          <Skeleton variant="rectangular" width={200} height={50} />
        </Box>
      </Box>
    );
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
        Admin Dashboard
      </Typography>

      <Typography variant="body1" align="center" paragraph>
        Manage users, track platform statistics, and monitor analytics here.
      </Typography>

      {/* Dashboard Stats Grid */}
      <Grid container spacing={2} justifyContent="center">
        {/* User Count */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                Total Users
              </Typography>
              <Typography variant="h4" color="primary">
                {userCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Review Count */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                Total Reviews
              </Typography>
              <Typography variant="h4" color="primary">
                {reviewCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                Active Users
              </Typography>
              <Typography variant="h4" color="primary">
                {activeUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Revenue */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h4" color="primary">
                {totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Manage Users
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
