import { Router } from "express";
import { handleLogin, handleLogout } from "../controllers/sessions.controller.js";

const routesSession = Router();

routesSession.post('/login', handleLogin)

routesSession.get('/getSession',(req,res)=>{
    res.send(req.session.user)
})

routesSession.post("/logout",handleLogout)

export default routesSession;