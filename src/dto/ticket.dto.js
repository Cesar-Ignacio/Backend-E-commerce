class TicketDTO {
    constructor(ticket) {
      this._id=ticket._id;  
      this.code = ticket.code;
      this.amount = ticket.amount.toFixed(2);
      this.purchaser= ticket.purchaser;
      this.purchase_datetime = new Date(ticket.purchase_datetime).toLocaleString();
      this.products=ticket.products
    }
  }
  
  export default TicketDTO;