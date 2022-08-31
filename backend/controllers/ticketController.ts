const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

//@desc Get a user's tickets
//@route GET /api/tickets
//@access Private
const getTickets = asyncHandler(async (req: any, res: any) => {
  //get user with the JWT
  const user = await User.findById(req.user.id);
  const tickets = await Ticket.find({ user: req.user.id });

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  res.status(200).json(tickets);
});

//@desc Get a single ticket
//@route GET /api/tickets/:id
//@access Private
const getSingleTicket = asyncHandler(async (req: any, res: any) => {
  //get user with the JWT
  const user = await User.findById(req.user.id);
  const ticket = await Ticket.findById(req.params.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found.");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized.");
  }

  res.status(200).json(ticket);
});

//@desc Create new tickets
//@route POST /api/new-ticket
//@access Private
const createTicket = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.user.id);
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please fill in product and description.");
  }

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

//@desc Delete tickets
//@route DELETE /api/tickets/:id
//@access Private
const deleteTicket = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.user.id);
  const ticket = await Ticket.findById(req.params.id);

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized.");
  }

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found.");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized.");
  }

  await ticket.remove();
  res.status(200).json({ success: true });
});

//@desc Update a ticket
//@route PUT /api/tickets/:id
//@access Private
const updateTicket = asyncHandler(async (req: any, res: any) => {
  //get user with the JWT
  const user = await User.findById(req.user.id);
  const ticket = await Ticket.findById(req.params.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found.");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized.");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = { getTickets, getSingleTicket, createTicket, deleteTicket, updateTicket };
export {};
