import cloudinary from "cloudinary";
import { IMedia } from './media.dto';
import MediaModel from './media.schema';

/**
 * Uploads a file to Cloudinary and stores media information in the database.
 * 
 * @function uploadFileToCloudinary
 * @param {Express.Multer.File} file - The file object to be uploaded, provided by Multer.
 * @param {string} createdBy - The ID of the user who uploaded the file.
 * @returns {Promise<IMedia>} The media object containing file details stored in the database.
 */
export const uploadFileToCloudinary = async (file: Express.Multer.File, createdBy: string): Promise<IMedia> => {
  const result = await cloudinary.v2.uploader.upload(file.path);

  // Save media info to the database
  const media = await MediaModel.create({
    fileName: file.originalname,
    fileUrl: result.secure_url,
    fileType: file.mimetype,
    cloudinaryId: result.public_id,
    createdBy,
  });

  return media;
};

/**
 * Deletes a file from Cloudinary using its public ID.
 * 
 * @function deleteFileFromCloudinary
 * @param {string} cloudinaryId - The public ID of the file on Cloudinary.
 * @returns {Promise<void>} Resolves once the file is successfully deleted.
 */
export const deleteFileFromCloudinary = async (cloudinaryId: string): Promise<void> => {
  await cloudinary.v2.uploader.destroy(cloudinaryId);
};

/**
 * Retrieves all media records from the database.
 * 
 * @function getAllMedia
 * @returns {Promise<IMedia[]>} A list of all media records stored in the database.
 */
export const getAllMedia = async () => {
  return await MediaModel.find().lean();
};

/**
 * Retrieves a media record by its ID.
 * 
 * @function getMediaById
 * @param {string} id - The ID of the media record to be retrieved.
 * @returns {Promise<IMedia | null>} The media object, or null if no media is found.
 */
export const getMediaById = async (id: string) => {
  return await MediaModel.findById(id).lean();
};
