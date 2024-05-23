import { MessagesManager } from "../dao/messages.mdb.js";

const mm = new MessagesManager();

export const handleGetMessages = async (req, res) => {
    try {
        const data = await mm.getAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const handleCreateMessage = async (req, res) => {
    try {
        const socketServer = req.app.get('socketServer');
        const data = req.body;
        const response = await mm.createMessage(data);
        res.status(201).send(response);
        socketServer.emit('messages', await mm.getAll());
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).send({ message: error.message })
    }
}