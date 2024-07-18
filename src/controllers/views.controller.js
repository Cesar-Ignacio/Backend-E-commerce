
import { ProductsModelManager } from "../dao/mongo/products.mdb.js";
import { CartModelManager } from "../dao/mongo/carts.mdb.js";

const pmm = new ProductsModelManager();
const cmm = new CartModelManager();

export const renderViewHoma = async (req, res) => {
    res.status(200).render("products", { user: req.user })
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
    const user = req.user;
    const { products } = await cmm.getCartById(user.cart_id);
    const productOfCart = products.map(({ _id, quantity }) => ({ ..._id, quantity }));
    res.status(200).render('carts', { products: productOfCart, user: user });
}

export const renderViewLogin = async (req, res) => {
    res.status(200).render('login');
}

export const renderViewRegister = async (req, res) => {
    res.status(200).render('register');
}