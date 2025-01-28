import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCreateContentMutation,
  useUpdateContentMutation,
  useGetContentByIdQuery,
} from "../../services/content.api";
import {
  useUploadMediaMutation,
  useDeleteMediaMutation,
} from "../../services/media.api";
import {
  useCreateOrUpdateSEOMutation,
  useGetSEOQuery,
} from "../../services/seo.api";
import { toast } from "react-toastify";

const CreateContent: React.FC = () => {
  const { id } = useParams(); // To determine if updating existing content
  const navigate = useNavigate();

  const [mediaIds, setMediaIds] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
      category: "",
      tags: [],
      author: "",
      status: "draft",
      seoTitle: "", 
      seoDescription: "",  
      seoKeywords: "",  
      seoCanonicalUrl: "",  
      seoRobots: "index, follow", 
    },
  });

  const { data: contentData, isLoading, isError, refetch } = useGetContentByIdQuery(id, {
    skip: !id, // Only fetch if editing
  });

  const { data: seoQueryData } = useGetSEOQuery(contentData?.data?.seoUrl, {
    skip: !contentData?.data?.seoUrl, // Skip SEO fetch if no URL
  });

  const [createContent, { isLoading: isCreating }] =
    useCreateContentMutation();
  const [updateContent, { isLoading: isUpdating }] =
    useUpdateContentMutation();

  const [uploadMedia] = useUploadMediaMutation();
  const [deleteMedia] = useDeleteMediaMutation();

  const [createOrUpdateSeo] = useCreateOrUpdateSEOMutation();

  // Populate form fields for editing
  useEffect(() => {
    if (contentData?.data) {
      reset({
        title: contentData.data.title,
        body: contentData.data.body,
        category: contentData.data.category,
        tags: contentData.data.tags,
        author: contentData.data.author,
        status: contentData.data.status,
        seoTitle: seoQueryData?.data?.title || "",
        seoDescription: seoQueryData?.data?.description || "",
        seoKeywords: seoQueryData?.data?.keywords?.join(", ") || "",
        seoCanonicalUrl: seoQueryData?.data?.canonicalUrl || "",
        seoRobots: seoQueryData?.data?.robots || "",
      });
      setMediaIds(contentData.data.media || []);
    }
  }, [contentData, seoQueryData, reset]);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      for (const file of e.target.files) {
        formData.append("file", file);
      }

      try {
        const response = await uploadMedia(formData).unwrap();
        
        // Handle media upload response
        if (response.data && response.data._id) {
          setMediaIds((prev) => [...prev, response.data._id]);
        } else if (response.data && Array.isArray(response.data.data)) {
          setMediaIds((prev) => [
            ...prev,
            ...response.data.data.map((media: any) => media._id),
          ]);
        }
        
        toast.success("Media uploaded successfully!");
      } catch {
        toast.error("Failed to upload media");
      }
    }
  };

  const handleMediaDelete = async (mediaId: string) => {
    try {
      await deleteMedia(mediaId).unwrap();
      setMediaIds((prev) => prev.filter((id) => id !== mediaId));
      toast.success("Media deleted successfully!");
    } catch {
      toast.error("Failed to delete media");
    }
  };

  const handleSeoSave = async (data: any) => {
    try {
      const seoDataToSave = {
        title: data.seoTitle,
        description: data.seoDescription,
        keywords: data.seoKeywords.split(",").map((keyword: string) => keyword.trim()), // Convert string to array
        canonicalUrl: data.seoCanonicalUrl,
        robots: data.seoRobots,
      };

      const response = await createOrUpdateSeo(seoDataToSave).unwrap();
      toast.success("SEO saved successfully!");
    } catch {
      toast.error("Failed to save SEO");
    }
  };

  const onSubmit = async (data: any) => {
    const contentPayload = {
      ...data,
      media: mediaIds,
      seoUrl: seoQueryData?.data?.url || null, // If you want to update the URL
    };

    try {
      if (id) {
        await updateContent({ id, ...contentPayload }).unwrap();
        toast.success("Content updated successfully!");
      } else {
        await createContent(contentPayload).unwrap();
        toast.success("Content created successfully!");
      }
      navigate("/contents");
    } catch {
      toast.error(`Failed to ${id ? "update" : "create"} content`);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {id ? "Update Content" : "Create Content"}
      </Typography>
      {isLoading && !contentData ? (
        <Typography variant="h6" color="textSecondary">
          Loading content data...
        </Typography>
      ) : isError ? (
        <Typography variant="h6" color="error">
          Failed to load content data.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Content fields */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="body"
                control={control}
                rules={{ required: "Body is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Body"
                    fullWidth
                    multiline
                    rows={6}
                    variant="outlined"
                    error={!!errors.body}
                    helperText={errors.body?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category"
                    fullWidth
                    variant="outlined"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="author"
                control={control}
                rules={{ required: "Author is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Author"
                    fullWidth
                    variant="outlined"
                    error={!!errors.author}
                    helperText={errors.author?.message}
                  />
                )}
              />
            </Grid>

            {/* Media upload */}
            <Grid item xs={12}>
              <Typography variant="h6">Media</Typography>
              <input
                type="file"
                multiple
                onChange={handleMediaUpload}
                accept="image/*,video/*"
              />
              <ul>
                {mediaIds.map((mediaId) => (
                  <li key={mediaId}>
                    {mediaId}
                    <Button
                      color="error"
                      onClick={() => handleMediaDelete(mediaId)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Grid>

            {/* SEO fields */}
            <Grid item xs={12}>
              <Typography variant="h6">SEO</Typography>
              <Controller
                name="seoTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="SEO Title"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="seoDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="SEO Description"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="seoKeywords"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="SEO Keywords"
                    fullWidth
                    helperText="Comma separated"
                  />
                )}
              />
              <Controller
                name="seoCanonicalUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="SEO Canonical URL"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="seoRobots"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="SEO Robots"
                    fullWidth
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(handleSeoSave)}
              >
                Save SEO
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating
                  ? "Saving..."
                  : id
                  ? "Update Content"
                  : "Create Content"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Paper>
  );
};

export default CreateContent;
