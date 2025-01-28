import ContentModel from "./content.schema";
import { IContent } from "./content.dto";

/**
 * Creates a new content entry in the database.
 * 
 * @function createContent
 * @param {IContent} data - The content data to be created.
 * @returns {Promise<IContent>} The created content entry.
 */
export const createContent = async (data: IContent) => {
  return await ContentModel.create(data);
};

/**
 * Retrieves a content entry by its ID.
 * 
 * @function getContentById
 * @param {string} id - The ID of the content to be retrieved.
 * @returns {Promise<IContent | null>} The content entry, or null if not found.
 */

export const getContentById = async (id: string) => {
  return await ContentModel.findById(id).populate("seo")
  .populate("media").lean();
};

/**
 * Updates an existing content entry by its ID.
 * 
 * @function updateContent
 * @param {string} id - The ID of the content to be updated.
 * @param {Partial<IContent>} data - The data to update in the content entry.
 * @returns {Promise<IContent | null>} The updated content entry, or null if not found.
 */
export const updateContent = async (id: string, data: Partial<IContent>) => {
  return await ContentModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

/**
 * Deletes a content entry by its ID.
 * 
 * @function deleteContent
 * @param {string} id - The ID of the content to be deleted.
 * @returns {Promise<{ deletedCount: number }>} The result of the delete operation.
 */
export const deleteContent = async (id: string) => {
  return await ContentModel.deleteOne({ _id: id });
};

/**
 * Retrieves all content entries that match the provided filters.
 * 
 * @function getAllContent
 * @param {Partial<IContent>} filters - The filters to apply when fetching the content entries.
 * @returns {Promise<IContent[]>} The list of content entries matching the filters.
 */
export const getAllContent = async (filters: Partial<IContent>) => {
  return await ContentModel.find(filters).populate("seo")
  .populate("media").lean();
};
