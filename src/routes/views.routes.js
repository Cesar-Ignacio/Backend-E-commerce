import { Router } from "express";
import { ProductManager } from "../class/ProductManager.js";

const routes =Router();
const pm=new ProductManager();

routes.get("/",async (req,res)=>{
    const data=await pm.getProducts();
    res.status(200).render("home",{data:data})
})

routes.get("/realTimeProducts",(req,res)=>{
    res.status(200).render('realTimeProducts');
})

export default routes;