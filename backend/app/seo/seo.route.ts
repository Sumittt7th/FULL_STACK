import { Router } from "express";
import * as seoController from "./seo.controller";
import { isAuthenticated } from "../common/middleware/isAuthenticate.middleware";
import { catchError } from '../common/middleware/cath-error.middleware';
import * as seoValidator from "./seo.validation";
import { roleAuth } from '../common/middleware/role-auth.middleware';

const router = Router();

// Routes for SEO operations
router
  .post("/", isAuthenticated,roleAuth("ADMIN"),seoValidator.seoValidation,catchError, seoController.createOrUpdateSEO)
  .get("/:url",seoValidator.getSeoValidation,catchError, seoController.getSEO)
  .get("/", isAuthenticated,catchError, seoController.getAllSeo);

export default router;
