import { Router } from "express";
import { renderViewHoma,renderViewRealTimeProducts } from "../controllers/views.controller.js";

const routes = Router();

routes.get("/", renderViewHoma)

routes.get("/realTimeProducts", renderViewRealTimeProducts)

export default routes;