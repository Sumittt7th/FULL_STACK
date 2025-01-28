/**
 * CreateContent component handles the creation and update of content.
 * It allows users to input content details, upload media, and configure SEO settings.
 * 
 * @component
 * @example
 * return <CreateContent />
 */

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
import { useDropzone } from 'react-dropzone';

const CreateContent: React.FC = () => {
  const { id } = useParams(); // To determine if updating existing content
  const navigate = useNavigate();

  /**
 * State to manage uploaded media files.
 * @type {Object[]}
 * @property {string} id - The ID of the media file.
 * @property {string} name - The name of the media file.
 */

  const [mediaFiles, setMediaFiles] = useState<{ id: string; name: string }[]>([]);

/**
 * State to manage the SEO ID.
 * @type {string|null}
 */
  const [seoId, setSeoId] = useState<string | null>(null); // For saving the SEO ID

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


  /**
 * Fetches content data if editing an existing content item.
 * @param {string} id - The ID of the content to fetch.
 * @param {Object} options - Options for the fetch query.
 */
  const { data: contentData, isLoading, isError, refetch } = useGetContentByIdQuery(id, {
    skip: !id, // Only fetch if editing
  });

  /**
 * Fetches SEO data related to the content if available.
 * @param {string} seoUrl - The SEO URL linked to the content.
 * @param {Object} options - Options for the fetch query.
 */
  const { data: seoQueryData } = useGetSEOQuery(contentData?.data?.seoUrl, {
    skip: !contentData?.data?.seoUrl, // Skip SEO fetch if no URL
  });

  const [createContent, { isLoading: isCreating }] = useCreateContentMutation();
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();

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
      setMediaFiles(contentData.data.media.map((item: any) => ({ id: item._id, name: item.name })));
      setSeoId(contentData?.data?.seoId || null); // Set the SEO ID if available
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
          setMediaFiles((prev) => [...prev, { id: response.data._id, name: response.data.fileName }]);
        } else if (response.data && Array.isArray(response.data.data)) {
          setMediaFiles((prev) => [
            ...prev,
            ...response.data.data.map((media: any) => ({ id: media._id, name: media.fileName })),
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
      setMediaFiles((prev) => prev.filter((file) => file.id !== mediaId));
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
      setSeoId(response.data._id); // Save the returned SEO ID
    } catch {
      toast.error("Failed to save SEO");
    }
  };

  const onSubmit = async (data: any) => {
    const contentPayload = {
      ...data,
      media: mediaFiles.map(file => file.id), // Send only media IDs
      seoId: seoId, // Include SEO ID in the content
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

  const handleMediaDrop = (acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    // Upload each file
    acceptedFiles.forEach(async (file) => {
      try {
        const response = await uploadMedia(formData).unwrap();
        if (response.data && response.data._id) {
          setMediaFiles((prev) => [...prev, { id: response.data._id, name: response.data.filename }]);
        } else if (response.data && Array.isArray(response.data.data)) {
          setMediaFiles((prev) => [
            ...prev,
            ...response.data.data.map((media: any) => ({ id: media._id, name: media.filename })),
          ]);
        }
        toast.success("Media uploaded successfully!");
      } catch {
        toast.error("Failed to upload media");
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleMediaDrop,
    multiple: true,
    accept: 'image/*,video/*',  // You can customize the accepted file types
  });

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
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Drag & Drop or Choose Files
                </Button>
              </div>

              <ul>
                {mediaFiles.map(({ id, name }) => (
                  <li key={id}>
                    {name}
                    <Button color="error" onClick={() => handleMediaDelete(id)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Grid>

            {/* SEO fields */}
            <Grid item xs={12}>
              <Typography variant="h6">SEO Settings</Typography>
              <Controller
                name="seoTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="SEO Title"
                    fullWidth
                    variant="outlined"
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
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="seoKeywords"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="SEO Keywords (comma separated)"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="seoCanonicalUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Canonical URL"
                    fullWidth
                    variant="outlined"
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
                    variant="outlined"
                  />
                )}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleSubmit(handleSeoSave)}
              >
                Save SEO
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isCreating || isUpdating}
              >
                {id ? "Update Content" : "Create Content"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Paper>
  );
};

export default CreateContent;
