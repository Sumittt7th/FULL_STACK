import { body, param } from "express-validator";

// Validation for creating or updating SEO data
export const seoValidation = [
  body("title").isString().withMessage("Title is required"),
  body("description").isString().withMessage("Description is required"),
  body("keywords").isArray().withMessage("Keywords should be an array"),
  body("canonicalUrl").isURL().withMessage("Canonical URL is required"),
  body("robots").optional().isString().withMessage("Robots should be a string"),
];

// URL parameter validation
export const getSeoValidation = [
  param("url").isString().withMessage("Canonical URL is required"),
];
