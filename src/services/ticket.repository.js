import TicketDTO from "../dto/ticket.dto.js";

export class TicketRepository {
    constructor(dao) {
        this.dao = new dao();
    }

    async createTicket(ticketData) {
        const ticket = await this.dao.create(ticketData);
        return new TicketDTO(ticket)
    }

    async getTicketById(ticketId)
    {
        const ticket =await this.dao.getById(ticketId);
        return new TicketDTO(ticket)
    }

}