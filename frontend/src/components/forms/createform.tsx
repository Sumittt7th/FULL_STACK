import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, TextField, Grid, Typography, Paper, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateFormMutation, useUpdateFormMutation, useGetFormByIdQuery } from "../../services/form.api";
import { toast } from "react-toastify";

const CreateForm: React.FC = () => {
  const { id } = useParams(); // To get the form ID for update (if available)
  const navigate = useNavigate();
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: "", description: "", fields: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  // API mutations and queries
  const [createForm, { isLoading: isCreating }] = useCreateFormMutation();
  const [updateForm, { isLoading: isUpdating }] = useUpdateFormMutation();
    const { data: formData, isLoading, isError,refetch } = useGetFormByIdQuery(id, {
        skip: !id, // Only run the query if an ID exists (edit mode)
    });

    // Populate form fields when editing
    useEffect(() => {
        if (formData?.data) {
        reset({
            title: formData.data.title,
            description: formData.data.description,
            fields: formData.data.fields.map((field: any) => ({
            name: field.name,
            type: field.type,
            label: field.label,
            validations: field.validations || {},
            })),
        });
        }
    }, [formData, reset]);

  const onSubmit = async (data: any) => {
    const formattedFields = data.fields.map((field: any) => ({
      name: field.name,
      type: field.type,
      label: field.label,
      validations: {
        required: field.validations?.required || false,
        minLength: field.validations?.minLength || undefined,
        maxLength: field.validations?.maxLength || undefined,
        regex: field.validations?.regex || undefined,
      },
    }));

    const formPayload = {
      title: data.title,
      description: data.description,
      fields: formattedFields,
    };

    try {
      if (id) {
        await updateForm({ id, data: formPayload }).unwrap();
        toast.success("Form updated successfully!");
      } else {
        await createForm(formPayload).unwrap();
        toast.success("Form created successfully!");
      }
      navigate("/forms");
      refetch();
    } catch (error) {
      toast.error(`Failed to ${id ? "update" : "create"} form`);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {id ? "Update Form" : "Create Form"}
      </Typography>
      {isLoading && !formData ? (
        <Typography variant="h6" color="textSecondary">
          Loading form data...
        </Typography>
      ) : isError ? (
        <Typography variant="h6" color="error">
          Failed to load form data.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {fields.map((field, index) => (
              <Grid item xs={12} key={field.id}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Controller
                      name={`fields[${index}].name`}
                      control={control}
                      rules={{ required: "Field name is required" }}
                      render={({ field: fieldProps }) => (
                        <TextField
                          {...fieldProps}
                          label="Field Name"
                          fullWidth
                          variant="outlined"
                          error={!!errors.fields?.[index]?.name}
                          helperText={errors.fields?.[index]?.name?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Controller
                      name={`fields[${index}].label`}
                      control={control}
                      rules={{ required: "Field label is required" }}
                      render={({ field: fieldProps }) => (
                        <TextField
                          {...fieldProps}
                          label="Field Label"
                          fullWidth
                          variant="outlined"
                          error={!!errors.fields?.[index]?.label}
                          helperText={errors.fields?.[index]?.label?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Controller
                      name={`fields[${index}].type`}
                      control={control}
                      render={({ field: fieldProps }) => (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Field Type</InputLabel>
                          <Select
                            {...fieldProps}
                            label="Field Type"
                          >
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
                            <MenuItem value="number">Number</MenuItem>
                            <MenuItem value="select">Select</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  append({
                    name: "",
                    label: "",
                    type: "text",
                    validations: { required: false },
                  })
                }
              >
                Add Field
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
                {isCreating || isUpdating ? "Saving..." : id ? "Update Form" : "Create Form"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Paper>
  );
};

export default CreateForm;
