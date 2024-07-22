import { modelUser } from "../../models/users.model.js";

export class UsersDao {
    constructor() { }

    async getAll() {
        return await modelUser.find().lean();
    }

    async createUser(data) {
        try {
            const existeUser = await modelUser.findOne({ email: data.email });
            if (existeUser) {
                throw new Error("El email ya esta registrado")
            }
            const user=await modelUser.create(data);
            return user.toObject();
        } catch (error) {
            console.error("Error al crear usuario", error)
            throw error;
        }
    }

    async findOneByEmail(email) {
        try {
            const user = await modelUser.findOne({ email: email }).lean();
            return user;
        } catch (error) {
            console.error("Error al buscar usuario", error)
            throw error;
        }
    }

    async updateUser(uid, cid) {
        try {
            const user = await modelUser.findByIdAndUpdate(uid, { $set: { cart_id: cid } }, { new: true }).lean();
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user

        } catch (error) {
            console.error("Error al buscar usuario", error)
            throw error;
        }
    }

}