
import { ProductsDao } from "../dao/mongo/products.mdb.dao.js";
import { CartDao } from "../dao/mongo/carts.mdb.dao.js";
import { cartService, productService } from "../services/index.js";

const pmm = new ProductsDao();
const cmm = new CartDao();

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
    const { productId } = req.params;
    const datas = await productService.getProductById(productId);
    res.status(200).render('productDetails', datas);
}

export const renderViewCarts = async (req, res) => {
    const user = req.session.user;
    const { products } = await cartService.getCartById(user.cart_id);
    const productOfCart = products.map(({ _id, quantity }) => ({ ..._id, quantity }));
    res.status(200).render('carts', { products: productOfCart, user: user });
}

export const renderViewLogin = async (req, res) => {
    res.status(200).render('login');
}

export const renderViewRegister = async (req, res) => {
    res.status(200).render('register');
}