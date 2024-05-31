
import { ProductsModelManager } from "../dao/products.mdb.js";
import { CartModelManager } from "../dao/carts.mdb.js";

const pmm = new ProductsModelManager();
const cmm = new CartModelManager();

export const renderViewHoma = async (req, res) => {
    res.status(200).render("products")
};

export const renderViewCreateProduct = (req, res) => {
    res.status(200).render('createProduct');
}

export const renderViewChat = (req, res) => {
    res.status(200).render('chat')
}

export const renderViewProductDetails = async (req, res) => {
    const { id } = req.params;
    const datas = await pmm.getProductById(id);
    res.status(200).render('productDetails', datas);
}

export const renderViewCarts = async (req, res) => {
    const { cid } = req.params;
    const { products } = await cmm.getCartById(cid);
    const productOfCart = products.map(({ _id, quantity }) =>({..._id,quantity}));
    res.status(200).render('carts', { products: productOfCart, idCart: cid });
}

