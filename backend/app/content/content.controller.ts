import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as contentService from "./content.service";
import { createResponse } from "../common/helper/response.hepler";

export const createContent = asyncHandler(async (req: Request, res: Response) => {
  const result = await contentService.createContent(req.body);
  res.send(createResponse(result, "Content created successfully"));
});

export const getContentById = asyncHandler(async (req: Request, res: Response) => {
  const result = await contentService.getContentById(req.params.id);
  res.send(createResponse(result));
});

export const updateContent = asyncHandler(async (req: Request, res: Response) => {
  const result = await contentService.updateContent(req.params.id, req.body);
  res.send(createResponse(result, "Content updated successfully"));
});

export const deleteContent = asyncHandler(async (req: Request, res: Response) => {
  const result = await contentService.deleteContent(req.params.id);
  res.send(createResponse(result, "Content deleted successfully"));
});

export const getAllContent = asyncHandler(async (req: Request, res: Response) => {
  const filters = req.query;
  const result = await contentService.getAllContent(filters);
  res.send(createResponse(result));
});
