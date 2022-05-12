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
    throw new Error('Unauthorized token');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json({
    tickets,
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

module.exports = {
  getTickets,
  createTicket,
};
