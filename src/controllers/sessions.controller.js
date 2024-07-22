import { UsersDao } from "../dao/mongo/users.mdb.dao.js";
import { checkPassword } from "../utils/bcrypt.js";

const umm = new UsersDao();

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await umm.findOneByEmail(email);
        if (await checkPassword(password, user.password)) {
            req.session.user = { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, id: user._id };
            res.status(200).send({ status: true, message: 'Autenticación exitosa', data: { url: '/' } })
        }
        else {
            res.status(401).send({ status: false, message: 'Password incorrecto', data: {} })
        }

    } catch ({ message }) {
        res.status(500).send({ status: false, message });
    }
}

export const handleLoginPassportLocal = async (req, res) => {
    try {
        const { message } = req.authInfo;
        req.session.user = req.user;
        res.status(200).send({ status: true, message, data: { url: '/' } });

    } catch ({ message }) {
        res.status(500).send({ status: false, message });
    }
}

export const handleLogout = (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send({ message: "Hubo un error" })
            }
            else {
                res.status(200).send({ message: { ok: true, url: '/login' } })
            }
        })

    } catch ({ message }) {
        res.status(500).send({ message: message });
    }
}