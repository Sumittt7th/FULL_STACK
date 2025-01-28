import { body, param, query } from "express-validator";

export const createContentValidator = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("body").isString().notEmpty().withMessage("Body is required"),
  body("author").isString().notEmpty().withMessage("Author is required"),
  body("status").isIn(["draft", "published"]).withMessage("Invalid status"),
];