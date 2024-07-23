export class TicketRepository{
    constructor(dao) {
        this.dao = new dao();
    }

    async createTicket(ticketData){
       return this.dao.create(ticketData);
    }

}