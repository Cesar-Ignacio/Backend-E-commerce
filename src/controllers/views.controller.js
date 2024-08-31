
import { ProductsDao } from "../dao/mongo/products.mdb.dao.js";
import { CartDao } from "../dao/mongo/carts.mdb.dao.js";
import { cartService, productService, ticketService } from "../services/index.js";

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
    const product = await productService.getProductById(productId);
    const data={
        ...product,
        cart_id:req.session.user.cart_id
    }  
    res.status(200).render('productDetails', data);
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

export const renderViewTickets = async (req, res) => {
    const { ticketId } = req.params;
    const ticket = await ticketService.getTicketById(ticketId);
    res.status(200).render('tickets', ticket);
}

export const renderViewPasswordReset = async (req, res) => {
    res.status(200).render('passwordReset');
}

export const renderViewNewPasswordEmail = async (req, res) => {
    res.status(200).render('newPasswordEmailTemplate');
}
