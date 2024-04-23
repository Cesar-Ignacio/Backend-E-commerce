import express from 'express'
import { config } from './config.js';
import { CartManager } from './cartManager.js';

const app = express();
const cm=new CartManager();

app.get("/api/cart/:idCart",async (req, res) => {
    const data =await cm.getProductCart(parseInt(req.params.idCart));
    res.send(data);
})

app.listen(config.PORT, () => {
    console.log(`Servidor activo http://localhost:${config.PORT}/`)
})

