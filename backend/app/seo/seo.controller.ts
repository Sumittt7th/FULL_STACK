import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as seoService from "./seo.service";
import { createResponse } from "../common/helper/response.hepler";
import { validationResult } from "express-validator";

// Create or Update SEO data
export const createOrUpdateSEO = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Error found");
  }

  const seoData = req.body;
  seoData.createdBy = req?.user?._id; // Assuming user ID is stored in `req.user`

  const updatedSEO = await seoService.createOrUpdateSEO(seoData);
  res.send(createResponse(updatedSEO, "SEO data saved/updated successfully"));
});

// Get SEO data by URL
export const getSEO = asyncHandler(async (req: Request, res: Response) => {
  const canonicalUrl = req.params.url;

  const seoData = await seoService.getSEOByUrl(canonicalUrl);
  if (!seoData) {
    throw new Error("SEO not found");
  }

  res.send(createResponse(seoData));
});
