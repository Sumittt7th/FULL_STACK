import cloudinary from "cloudinary";
import { IMedia } from './media.dto';
import MediaModel from './media.schema';

// Upload file to Cloudinary
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

// Delete file from Cloudinary
export const deleteFileFromCloudinary = async (cloudinaryId: string): Promise<void> => {
  await cloudinary.v2.uploader.destroy(cloudinaryId);
};

// Get all media
export const getAllMedia = async () => {
  return await MediaModel.find().lean();
};

// Get media by ID
export const getMediaById = async (id: string) => {
  return await MediaModel.findById(id).lean();
};
