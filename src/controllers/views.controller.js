import { ProductManager } from "../class/ProductManager.js";
import { modelProduct } from "../dao/models/product.model.js";

const pm = new ProductManager();

export const renderViewHoma = async (req, res) => {
    //const data = await pm.getProducts();
    const data = await modelProduct.find().lean();
    res.status(200).render("home", { data: data })
};

export const renderViewRealTimeProducts = (req, res) => {
    res.status(200).render('realTimeProducts');
};