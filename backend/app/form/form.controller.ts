import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as formService from "./form.service";
import { createResponse } from "../common/helper/response.hepler";

/**
 * Creates a new form schema.
 * 
 * @function createForm
 * @param {Request} req - Express request object. The body of the request should contain the form schema data.
 * @param {Response} res - Express response object. Sends a response with the created form schema and a success message.
 * @returns {void}
 */
export const createForm = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.createFormSchema(req.body);
  res.send(createResponse(result, "Form schema created successfully"));
});

/**
 * Retrieves a form schema by its ID.
 * 
 * @function getFormById
 * @param {Request} req - Express request object. The request parameters should contain the form schema ID (req.params.id).
 * @param {Response} res - Express response object. Sends a response with the form schema data.
 * @returns {void}
 */
export const getFormById = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.getFormSchemaById(req.params.id);
  res.send(createResponse(result));
});

/**
 * Updates a form schema by its ID.
 * 
 * @function updateForm
 * @param {Request} req - Express request object. The request parameters should contain the form schema ID (req.params.id).
 *        The body of the request should contain the updated form schema data.
 * @param {Response} res - Express response object. Sends a response with the updated form schema and a success message.
 * @returns {void}
 */
export const updateForm = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.updateFormSchema(req.params.id, req.body);
  res.send(createResponse(result, "Form schema updated successfully"));
});

/**
 * Deletes a form schema by its ID.
 * 
 * @function deleteForm
 * @param {Request} req - Express request object. The request parameters should contain the form schema ID (req.params.id).
 * @param {Response} res - Express response object. Sends a response with a success message indicating the form schema was deleted.
 * @returns {void}
 */
export const deleteForm = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.deleteFormSchema(req.params.id);
  res.send(createResponse(result, "Form schema deleted successfully"));
});

/**
 * Retrieves all form schemas.
 * 
 * @function getAllForms
 * @param {Request} req - Express request object. The query parameters can contain filters (req.query).
 * @param {Response} res - Express response object. Sends a response with the list of all form schemas.
 * @returns {void}
 */
export const getAllForms = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.getAllFormSchemas();
  res.send(createResponse(result));
});
