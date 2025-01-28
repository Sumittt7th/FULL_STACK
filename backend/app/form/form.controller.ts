import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as formService from "./form.service";
import { createResponse } from "../common/helper/response.hepler";

export const createForm = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.createFormSchema(req.body);
  res.send(createResponse(result, "Form schema created successfully"));
});

export const getFormById = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.getFormSchemaById(req.params.id);
  res.send(createResponse(result));
});

export const updateForm = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.updateFormSchema(req.params.id, req.body);
  res.send(createResponse(result, "Form schema updated successfully"));
});

export const deleteForm = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.deleteFormSchema(req.params.id);
  res.send(createResponse(result, "Form schema deleted successfully"));
});

export const getAllForms = asyncHandler(async (req: Request, res: Response) => {
  const result = await formService.getAllFormSchemas();
  res.send(createResponse(result));
});
