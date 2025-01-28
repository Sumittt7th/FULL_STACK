import { body, param } from "express-validator";

export const createFormValidator = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("fields").isArray().withMessage("Fields must be an array"),
  body("fields.*.name").isString().notEmpty().withMessage("Field name is required"),
  body("fields.*.type").isString().notEmpty().withMessage("Field type is required"),
];