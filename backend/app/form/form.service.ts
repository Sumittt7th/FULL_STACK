import FormModel from "./form.schema";
import { IFormSchema } from "./form.dto";

/**
 * Creates a new form schema in the database.
 * 
 * @function createFormSchema
 * @param {IFormSchema} data - The form schema data to be created.
 * @returns {Promise<IFormSchema>} The created form schema entry.
 */
export const createFormSchema = async (data: IFormSchema) => {
  return await FormModel.create(data);
};

/**
 * Retrieves a form schema by its ID.
 * 
 * @function getFormSchemaById
 * @param {string} id - The ID of the form schema to be retrieved.
 * @returns {Promise<IFormSchema | null>} The form schema entry, or null if not found.
 */
export const getFormSchemaById = async (id: string) => {
  const result = await FormModel.findById(id).lean();
  console.log(result);
  return result;
};

/**
 * Updates an existing form schema by its ID.
 * 
 * @function updateFormSchema
 * @param {string} id - The ID of the form schema to be updated.
 * @param {Partial<IFormSchema>} data - The data to update in the form schema.
 * @returns {Promise<IFormSchema | null>} The updated form schema, or null if not found.
 */
export const updateFormSchema = async (id: string, data: Partial<IFormSchema>) => {
  return await FormModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

/**
 * Deletes a form schema by its ID.
 * 
 * @function deleteFormSchema
 * @param {string} id - The ID of the form schema to be deleted.
 * @returns {Promise<{ deletedCount: number }>} The result of the delete operation.
 */
export const deleteFormSchema = async (id: string) => {
  return await FormModel.deleteOne({ _id: id });
};

/**
 * Retrieves all form schemas that are active.
 * 
 * @function getAllFormSchemas
 * @returns {Promise<IFormSchema[]>} The list of active form schemas.
 */

export const getAllFormSchemas = async () => {
  return await FormModel.find({ active: true }).lean();
};
