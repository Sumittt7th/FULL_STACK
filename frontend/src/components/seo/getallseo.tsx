import React from "react";
import { useGetAllSEOQuery } from "../../services/seo.api"; // Replace with your actual API file
import { Container, Grid, Card, CardContent, Typography, Box, Skeleton } from "@mui/material";

const AllSEO: React.FC = () => {
  const { data, isLoading, isError } = useGetAllSEOQuery();

  return (
    <Container>
      {/* Header section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 3 }}>
        <Typography variant="h4">All SEO</Typography>
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
          Failed to load SEO data.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {data?.data?.map((seo) => (
            <Grid item xs={12} sm={6} md={4} key={seo._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{seo.title}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Description: {seo.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Keywords: {seo.keywords?.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Canonical URL: {seo.canonicalUrl}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Robots: {seo.robots}
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

export default AllSEO;
