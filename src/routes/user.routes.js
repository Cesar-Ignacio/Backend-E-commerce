import { Router } from "express";
import { handleCreateUser } from "../controllers/users.controller.js";
import { modelUser } from "../dao/models/users.model.js";

const routesUser=Router();

routesUser.post('/createUser',handleCreateUser);

routesUser.get('/',async(req,res)=>{
    const d=await modelUser.find().lean();
    res.send(d)
})
export default routesUser;