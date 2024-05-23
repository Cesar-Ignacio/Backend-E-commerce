import { Router } from "express";
import { renderViewCreateProduct, renderViewHoma,renderViewRealTimeProducts } from "../controllers/views.controller.js";

const routes = Router();

routes.get("/", renderViewHoma)

routes.get("/realTimeProducts", renderViewRealTimeProducts)

routes.get("/createProduct",renderViewCreateProduct);

routes.get("/chat",(req,res)=>{
    res.status(200).render('chat')
})

export default routes;