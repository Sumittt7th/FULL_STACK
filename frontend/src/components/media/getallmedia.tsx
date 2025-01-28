import React from "react";
import { useGetAllMediaQuery } from "../../services/media.api"; // Replace with your actual API file
import { Container, Grid, Card, CardContent, Typography, Box, Skeleton } from "@mui/material";

const AllMedia: React.FC = () => {
  const { data, isLoading, isError } = useGetAllMediaQuery();

  return (
    <Container>
      {/* Header section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 3 }}>
        <Typography variant="h4">All Media</Typography>
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
          Failed to load media.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {data?.data?.map((media) => (
            <Grid item xs={12} sm={6} md={4} key={media._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <img
                    src={media.fileUrl}
                    alt={media.fileName}
                    style={{ width: "100%", height: "auto", borderRadius: "8px", marginBottom: "8px" }}
                  />
                  <Typography variant="h6">{media.fileName}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Type: {media.fileType}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Uploaded At: {new Date(media.uploadedAt).toLocaleString()}
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

export default AllMedia;
