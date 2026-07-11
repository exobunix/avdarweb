import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminAuthRouter from "./admin-auth";
import siteSettingsRouter from "./site-settings";
import themeSettingsRouter from "./theme-settings";
import navLinksRouter from "./nav-links";
import footerLinksRouter from "./footer-links";
import servicesRouter from "./services";
import productsRouter from "./products";
import portfolioProjectsRouter from "./portfolio-projects";
import industriesRouter from "./industries";
import blogPostsRouter from "./blog-posts";
import careerRolesRouter from "./career-roles";
import pageContentRouter from "./page-content";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminAuthRouter);
router.use(siteSettingsRouter);
router.use(themeSettingsRouter);
router.use(navLinksRouter);
router.use(footerLinksRouter);
router.use(servicesRouter);
router.use(productsRouter);
router.use(portfolioProjectsRouter);
router.use(industriesRouter);
router.use(blogPostsRouter);
router.use(careerRolesRouter);
router.use(pageContentRouter);

export default router;
