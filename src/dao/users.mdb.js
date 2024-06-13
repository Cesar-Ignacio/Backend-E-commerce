import { modelUser } from "./models/users.model.js";

export class UsersModelManager {
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
            const newUser = new modelUser(data);
            const user = await newUser.save();
            return user;
        } catch (error) {
            console.error("Error al crear usuario", error)
            throw error;
        }
    }

    async findOneByEmail(email) {
        try {
            const user = await modelUser.findOne({ email: email })
            return user;
        } catch (error) {
            console.error("Error al buscar usuario", error)
            throw error;
        }
    }

}