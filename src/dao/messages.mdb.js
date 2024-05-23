import { modelMessage } from "./models/messages.model.js";

export class MessagesManager {
    constructor() { }

    async getAll() {
        try {
            return await modelMessage.find().lean();
        } catch (error) {
            throw error;
        }
    }

    async createMessage(datos) {
        try {
            const message = new modelMessage(datos);
            const newMessage = await message.save();
            return newMessage;
        } catch (error) {
            throw error;
        }
    }
}