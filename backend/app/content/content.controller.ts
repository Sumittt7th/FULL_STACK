import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as contentService from "./content.service";
import { createResponse } from "../common/helper/response.hepler";

/**
 * Creates new content.
 * 
 * @function createContent
 * @param {Request} req - Express request object. The body of the request should contain the content data to be created.
 * @param {Response} res - Express response object. Sends a response with the created content data and a success message.
 * @returns {void}
 * 
 * @example
 * // POST request to create content
 * POST /content
 * Request body: { title: "Sample Content", body: "Content body text" }
 * Response: { success: true, data: { title: "Sample Content", body: "Content body text" }, message: "Content created successfully" }
 */
export const createContent = asyncHandler(async (req: Request, res: Response) => {
  const result = await contentService.createContent(req.body);
  res.send(createResponse(result, "Content created successfully"));
});

/**
 * Retrieves content by its ID.
 * 
 * @function getContentById
 * @param {Request} req - Express request object. The request parameters should contain the content ID (req.params.id).
 * @param {Response} res - Express response object. Sends a response with the content data.
 * @returns {void}
 * 
 * @example
 * // GET request to retrieve content by ID
 * GET /content/:id
 * Response: { success: true, data: { title: "Sample Content", body: "Content body text" } }
 */
export const getContentById = asyncHandler(async (req: Request, res: Response) => {
  const result = await contentService.getContentById(req.params.id);
  res.send(createResponse(result));
});

/**
 * Updates content by its ID.
 * 
 * @function updateContent
 * @param {Request} req - Express request object. The request parameters should contain the content ID (req.params.id).
 *        The body of the request should contain the updated content data.
 * @param {Response} res - Express response object. Sends a response with the updated content data and a success message.
 * @returns {void}
 * 
 * @example
 * // PUT request to update content
 * PUT /content/:id
 * Request body: { title: "Updated Title", body: "Updated content body" }
 * Response: { success: true, data: { title: "Updated Title", body: "Updated content body" }, message: "Content updated successfully" }
 */
export const updateContent = asyncHandler(async (req: Request, res: Response) => {
  const result = await contentService.updateContent(req.params.id, req.body);
  res.send(createResponse(result, "Content updated successfully"));
});

/**
 * Deletes content by its ID.
 * 
 * @function deleteContent
 * @param {Request} req - Express request object. The request parameters should contain the content ID (req.params.id).
 * @param {Response} res - Express response object. Sends a response with a success message indicating the content was deleted.
 * @returns {void}
 * 
 * @example
 * // DELETE request to remove content by ID
 * DELETE /content/:id
 * Response: { success: true, message: "Content deleted successfully" }
 */
export const deleteContent = asyncHandler(async (req: Request, res: Response) => {
  const result = await contentService.deleteContent(req.params.id);
  res.send(createResponse(result, "Content deleted successfully"));
});

/**
 * Retrieves all content with optional filters.
 * 
 * @function getAllContent
 * @param {Request} req - Express request object. The query parameters can contain filters (req.query).
 * @param {Response} res - Express response object. Sends a response with an array of all content matching the filters.
 * @returns {void}
 * 
 * @example
 * // GET request to retrieve all content with filters
 * GET /content?filter=someFilter
 * Response: { success: true, data: [{ title: "Content 1", body: "Body 1" }, { title: "Content 2", body: "Body 2" }] }
 */
export const getAllContent = asyncHandler(async (req: Request, res: Response) => {
  const filters = req.query;
  const result = await contentService.getAllContent(filters);
  res.send(createResponse(result));
});
