import express from "express";
import userRoutes from "./user/user.route";
import formRoutes from "./form/form.route"
import mediaRoutes from "./media/media.route"
import contentRoutes from "./content/content.route"
import seoRoutes from "./seo/seo.route"
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("./swagger/swagger.json");

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/forms", formRoutes);
router.use("/medias", mediaRoutes);
router.use("/contents", contentRoutes);
router.use("/seos", seoRoutes);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;