import { modelUser } from "../../models/users.model.js";

export class UsersDao {
    constructor() { }

    async getUserAll() {
        return await modelUser.find({ role: { $ne: 'ADMIN' } }).lean();
    }

    async getAll() {
        return await modelUser.find().lean();
    }

    async create(userData) {
        try {
            const user = await modelUser.create(userData);
            return user.toObject();
        } catch (error) {
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

    async delete(userId) {
        try {
            return await modelUser.findByIdAndDelete(userId).lean();
        } catch (error) {
            throw error;
        }
    }

    async addDocument(userId, documents) {
        try {
            let updatedUser = await modelUser.findByIdAndUpdate(userId, { $set: { documents: documents } }, { new: true, useFindAndModify: false }).lean();
            const hasDocuments = updatedUser.documents && updatedUser.documents.length > 0;
            updatedUser = await modelUser.findByIdAndUpdate(userId, { hasDocuments: hasDocuments }, { new: true, useFindAndModify: false });
            return updatedUser;
        } catch (error) {
            throw error
        }
    }

}