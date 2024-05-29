
import { ProductsModelManager } from "../dao/products.mdb.js";

const pmm=new ProductsModelManager();

export const renderViewHoma = async (req, res) => {
    res.status(200).render("products")
};

export const renderViewCreateProduct = (req, res) => {
    res.status(200).render('createProduct');
}

export const renderViewChat = (req, res) => {
    res.status(200).render('chat')
}

export const renderViewProductDetails = async(req, res) => {
    const { id } = req.params;
    const datas=await pmm.getProductById(id);
    res.status(200).render('productDetails', datas);
}