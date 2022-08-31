import axios from "axios";
import { TicketType } from "../../types";

const API_URL = '/api/tickets';

//create new ticket
const newTicket = async (ticket: TicketType, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticket, config);

  return response.data;
};

//get all tickets
const getTickets = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//update ticket
const updateTicket = async (ticket: TicketType, token:string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.put(`${API_URL}/${ticket._id}`, ticket, config);

  return response.data;
};

//delete ticket
const deleteTicket = async (id: string, token:string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

export const ticketService = {
  newTicket,
  getTickets,
  updateTicket,
  deleteTicket,
};
