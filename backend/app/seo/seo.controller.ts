import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as seoService from "./seo.service";
import { createResponse } from "../common/helper/response.hepler";
import { validationResult } from "express-validator";

/**
 * Creates or updates SEO data.
 * 
 * @function createOrUpdateSEO
 * @param {Request} req - Express request object. The body of the request should contain the SEO data to be created or updated.
 * @param {Response} res - Express response object. Sends a response with the created/updated SEO data and a success message.
 * @returns {void}
 * 
 * @throws {Error} If validation errors exist or if an issue occurs while saving/updating the SEO data.
 */
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

/**
 * Retrieves SEO data by its canonical URL.
 * 
 * @function getSEO
 * @param {Request} req - Express request object. The canonical URL should be in `req.params.url`.
 * @param {Response} res - Express response object. Sends a response with the SEO data for the given URL.
 * @returns {void}
 * 
 * @throws {Error} If the SEO data for the given URL is not found.
 */
export const getSEO = asyncHandler(async (req: Request, res: Response) => {
  const canonicalUrl = req.params.url;

  const seoData = await seoService.getSEOByUrl(canonicalUrl);
  if (!seoData) {
    throw new Error("SEO not found");
  }

  res.send(createResponse(seoData));
});

/**
 * Retrieves all SEO data.
 * 
 * @function getAllSeo
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object. Sends a response with all the SEO data.
 * @returns {void}
 */
export const getAllSeo = asyncHandler(async (req: Request, res: Response) => {
  const seo = await seoService.getAllSeo();
  res.send(createResponse(seo));
});
