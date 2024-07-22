import { UsersDao } from "../dao/mongo/users.mdb.dao.js";
import { CartDao } from "../dao/mongo/carts.mdb.dao.js";
import { hashPassword } from "../utils/bcrypt.js";

const umm = new UsersDao();
const cmm = new CartDao();

export const handleCreateUser = async (req, res) => {
    try {
        const { password } = req.body;
        const registerData = {
            ...req.body,
            password: await hashPassword(password)
        }
        const user = await umm.createUser(registerData);
        req.session.user = { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, id: user._id };
        res.status(200).send({ status: true, message: "Usuario registado", data: { url: '/', user: req.session.user } });
    } catch ({ message }) {
        res.status(500).send({ status: false, message: message });
    }
}

export const handleCreateUserPassport = async (req, res) => {
    try {
        const { message } = req.authInfo;
       
        const user = await umm.createUser(req.user);
        // creamos el cart
        const cart = await cmm.create(user._id);
        // actulizamos campo cart_id de user 
        const updateUser = await umm.updateUser(user._id, cart._id);
        req.session.user = updateUser;
        res.status(200).send({ status: true, message, data: { url: '/'} });
    } catch ({ message }) {
        res.status(500).send({ status: false, message });
    }
}

