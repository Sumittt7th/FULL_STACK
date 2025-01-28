import { Router } from "express";
import * as contentController from "./content.controller";
import { isAuthenticated } from "../common/middleware/isAuthenticate.middleware";
import * as contentValidator from "./content.validation";
import { catchError } from '../common/middleware/cath-error.middleware';
import { roleAuth } from '../common/middleware/role-auth.middleware';

const router = Router();

router
  .get("/", isAuthenticated,catchError, contentController.getAllContent)
  .get("/:id", isAuthenticated,catchError, contentController.getContentById)
  .post("/", isAuthenticated,roleAuth("ADMIN"),contentValidator.createContentValidator, catchError,contentController.createContent)
  .put("/:id", isAuthenticated,roleAuth("ADMIN"),catchError, contentController.updateContent)
  .delete("/:id", isAuthenticated,roleAuth("ADMIN"),catchError, contentController.deleteContent);

export default router;
