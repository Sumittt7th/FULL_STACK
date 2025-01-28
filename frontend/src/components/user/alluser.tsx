import React from "react";
import { useGetAllUsersQuery } from "../../services/user.api"; // Replace with your actual API file
import { Container, Grid, Card, CardContent, Typography, Box, Skeleton } from "@mui/material";

const AllUsers: React.FC = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();

  return (
    <Container>
      {/* Header section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 3 }}>
        <Typography variant="h4">All Users</Typography>
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
          Failed to load users.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {data?.data?.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {user.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AllUsers;
