import { modelUser } from "../dao/models/users.model.js";
import { UsersModelManager } from "../dao/users.mdb.js";
import { hashPassword } from "../utils/bcrypt.js";

const umm = new UsersModelManager();

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
        if (typeof req.user !== 'object') {
            return res.status(409).send({ status: false, message, data: {} });
        }
        const user = await umm.createUser(req.user);
        req.session.user = { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, id: user._id };
        res.status(200).send({ status: true, message, data: { url: '/', user: req.session.user } });
    } catch ({ message }) {
        res.status(500).send({ status: false, message });
    }
}

