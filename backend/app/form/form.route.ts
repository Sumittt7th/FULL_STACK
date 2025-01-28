import { Router } from "express";
import * as formController from "./form.controller";
import { isAuthenticated } from "../common/middleware/isAuthenticate.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { catchError } from '../common/middleware/cath-error.middleware';
import * as formValidator from "./form.validation";

const router = Router();

router
  .get("/", isAuthenticated,catchError, formController.getAllForms)
  .get("/:id", isAuthenticated,catchError, formController.getFormById)
  .post("/", isAuthenticated, roleAuth("ADMIN"),formValidator.createFormValidator,catchError, formController.createForm)
  .put("/:id", isAuthenticated, roleAuth("ADMIN"),catchError, formController.updateForm)
  .delete("/:id", isAuthenticated, roleAuth("ADMIN"),catchError, formController.deleteForm);

export default router;
