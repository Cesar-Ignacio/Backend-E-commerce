import { modelUser } from "../dao/models/users.model.js";
import { UsersModelManager } from "../dao/users.mdb.js";

const umm=new UsersModelManager();

export const handleCreateUser = async (req, res) => {
    try {
        const user = await umm.createUser(req.body);
        req.session.user = { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, id: user._id };
        res.status(200).send({ message: { ok: true, url: '/' } });
    } catch ({ message }) {
        res.status(500).send({ message: message });
    }
}