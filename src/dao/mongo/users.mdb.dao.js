import { modelUser } from "../../models/users.model.js";

export class UsersDao {
    constructor() { }

    async getAll() {
        return await modelUser.find().lean();
    }

    async create(userData) {
        try {
            const existeUser = await modelUser.findOne({ email: userData.email });
            if (existeUser) {
                throw new Error("El email ya esta registrado")
            }
            const user = await modelUser.create(userData);
            return user.toObject();
        } catch (error) {
            console.error("Error al crear usuario", error)
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await modelUser.findById(userId);
            return user;
        } catch (error) {
            console.error("Error al crear usuario", error)
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            const user = await modelUser.findOne({ email: email }).lean();
            return user;
        } catch (error) {
            console.error("Error al buscar usuario", error)
            throw error;
        }
    }

    async update(userId, userData) {
        try {
            const user = await modelUser.findByIdAndUpdate(userId, userData, { new: true }).lean();
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