import { ProductManager } from "../class/ProductManager.js";

const pm = new ProductManager();

export const renderViewHoma = async (req, res) => {
    const data = await pm.getProducts();
    res.status(200).render("home", { data: data })
};

export const renderViewRealTimeProducts=(req, res) => {
    res.status(200).render('realTimeProducts');
};