import { modelMessage } from "../../models/messages.model.js";

export class MessagesDao {
    constructor() { }

    async getAll() {
        try {
            return await modelMessage.find().lean();
        } catch (error) {
            throw error;
        }
    }

    async create(email,message) {
        try {
            const newMessage = await modelMessage.create({email,message});
            return newMessage;
        } catch (error) {
            throw error;
        }
    }
}