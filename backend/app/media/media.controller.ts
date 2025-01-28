import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as mediaService from "./media.service";
import { createResponse } from "../common/helper/response.hepler";
import { validationResult } from "express-validator";
import MediaModel from './media.schema';
import createHttpError from 'http-errors';

// Upload media
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

// Delete media
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

// Get all media
export const getAllMedia = asyncHandler(async (req: Request, res: Response) => {
  const media = await mediaService.getAllMedia();
  res.send(createResponse(media));
});
