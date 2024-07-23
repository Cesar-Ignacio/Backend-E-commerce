
import { modelTicket } from "../../models/tickets.model.js";

export class TicketsDao {
    constructor() { }

    async create(ticketData) {
        try {
            const ticket = await modelTicket.create(ticketData)
            return ticket;
        } catch (error) {
            console.error("Error al crear ticket:", error)
            throw error;
        }
    }

}