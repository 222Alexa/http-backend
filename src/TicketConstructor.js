const { v4: uuidv4 } = require("uuid");
const { Ticket, TicketFull } = require("./Ticket");

class TicketConstructor {
  constructor() {
    this.ticketsArr = []; //это массив тикетов
    this.descriptionArr = [];
  }
  allTickets() {
    this.shortTickets = this.ticketsArr.map(
      (elem) => new Ticket(elem.id, elem.name, elem.status, elem.created)
    );
    return this.shortTickets;
  }

  getStartedTickets() {
    const ticket1 = new TicketFull("name", "description");

    this.ticketsArr.push(ticket1);
    return this.ticketsArr;
  }

  createTicket(object) {
    const data = JSON.parse(object);

    const ticket = new TicketFull(data.name, object.description);
    const description = { id: ticket.id, description: data.description };
    this.descriptionArr.push(description);
    this.ticketsArr.push(ticket);
   
    return ticket;
  }

  getIndexId(id) {
    const index = this.ticketsArr.findIndex((elem) => elem.id === id);
    return index;
  }

  getTicketById(id) {
    const ticket = this.descriptionArr.find((elem) => elem.id === id);
    
    return ticket;
  }

  deleteTicket(id) {
    const item = this.getIndexId(id);
    return !!this.ticketsArr.splice(item, 1);
  }

  toggleStatusTicket(id) {
    const index = this.getIndexId(id);
    const item = this.ticketsArr[index];
   
    item.status === false ? (item.status = true) : (item.status = false);
    
    return item.status;
  }

  editTicket(object) {
    const data = JSON.parse(object);
   
    const index = this.getIndexId(data.id);
   
    const item = this.ticketsArr[index];

    item.name = data.name;
    item.description = data.description;
    const ticketDescription = this.descriptionArr.find(
      (elem) => elem.id === data.id
    );
    ticketDescription.description = data.description;
   
    return item;
  }
}
module.exports = TicketConstructor;
