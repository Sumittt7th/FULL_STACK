import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as mediaService from "./media.service";
import { createResponse } from "../common/helper/response.hepler";
import { validationResult } from "express-validator";
import MediaModel from './media.schema';
import createHttpError from 'http-errors';

/**
 * Uploads a media file to Cloudinary and saves the media details to the database.
 * 
 * @function uploadMedia
 * @param {Request} req - Express request object. The file to be uploaded should be in `req.file`, and user details should be available in `req.user`.
 * @param {Response} res - Express response object. Sends a response with the uploaded media file and a success message.
 * @returns {void}
 * 
 * @throws {Error} If validation errors exist or if the file or user details are missing.
 */
export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Error found");
  }

  const file = req.file;
  const createdBy = req?.user?._id; 

  if (!file || !createdBy) {
    throw new Error("File not found");
  }

  const media = await mediaService.uploadFileToCloudinary(file, createdBy);
  console.log(media);
  res.send(createResponse(media, "File uploaded successfully"));
});

/**
 * Deletes a media file from Cloudinary and removes its record from the database.
 * 
 * @function deleteMedia
 * @param {Request} req - Express request object. The media ID should be in `req.params.id`.
 * @param {Response} res - Express response object. Sends a response confirming the file has been deleted.
 * @returns {void}
 * 
 * @throws {Error} If the media is not found in the database or if an error occurs during deletion.
 */
export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const mediaId = req.params.id;

  const media = await mediaService.getMediaById(mediaId);
  if (!media) {
    throw new Error("Media not found");
  }

  await mediaService.deleteFileFromCloudinary(media.cloudinaryId);
  await MediaModel.findByIdAndDelete(mediaId);
  
  res.send(createResponse(null, "File deleted successfully"));
});

/**
 * Retrieves all media records.
 * 
 * @function getAllMedia
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object. Sends a response with the list of all media files.
 * @returns {void}
 */
export const getAllMedia = asyncHandler(async (req: Request, res: Response) => {
  const media = await mediaService.getAllMedia();
  res.send(createResponse(media));
});

/**
 * Retrieves a media file by its ID.
 * 
 * @function getMediaById
 * @param {Request} req - Express request object. The media ID should be in `req.params.id`.
 * @param {Response} res - Express response object. Sends a response with the media file data.
 * @returns {void}
 * 
 * @throws {Error} If the media file is not found.
 */
export const getMediaById = asyncHandler(async (req: Request, res: Response) => {
  const mediaId = req.params.id;
  const media = await mediaService.getMediaById(mediaId);
  
  // If no media is found, throw an error
  if (!media) {
    throw new Error("Media not found");
  }
  res.send(createResponse(media));
});
