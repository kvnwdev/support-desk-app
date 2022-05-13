const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

/**
 * @name getTickets
 * @desc Fetch tickets for a user
 * @route GET /api/tickets
 * @access Private
 */
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json({
    tickets,
  });
});

/**
 * @name getTicket
 * @desc Fetch a single ticket
 * @route GET /api/tickets/:id
 * @access Private
 */
const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized token');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json({
    ticket,
  });
});

/**
 * @name createTicket
 * @desc Creates a ticket
 * @route POST /api/tickets
 * @access Private
 */
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Missing fields');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized token');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
  });

  res.status(201).json({
    ticket,
  });
});

/**
 * @name deleteTicket
 * @desc Deletes a ticket
 * @route DELETE /api/tickets/:id
 * @access Private
 */
const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized token');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await ticket.remove();

  res.status(200).json({
    success: true,
  });
});

/**
 * @name updateTicket
 * @desc Updates a ticket
 * @route PUT /api/tickets/:id
 * @access Private
 */
const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized token');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    updatedTicket,
  });
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
