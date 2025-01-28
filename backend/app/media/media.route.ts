import { Router } from "express";
import multer from "multer";
import * as mediaController from "./media.controller";
import { isAuthenticated } from "../common/middleware/isAuthenticate.middleware";
import { catchError } from '../common/middleware/cath-error.middleware';
import { roleAuth } from '../common/middleware/role-auth.middleware';


// Set up Multer for file uploads
const upload = multer({ dest: "uploads/" });

const router = Router();

router
  .post("/upload", isAuthenticated,roleAuth("ADMIN"), upload.single("file"),catchError, mediaController.uploadMedia)
  .delete("/:id", isAuthenticated,roleAuth("ADMIN"),catchError, mediaController.deleteMedia)
  .get("/", isAuthenticated,catchError, mediaController.getAllMedia);

export default router;
