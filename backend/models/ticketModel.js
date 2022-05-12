const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please add a product'],
      enum: ['iPhone', 'Macbook', 'iMac', 'iPad', 'Other'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description of the issue'],
    },
    status: {
      type: String,
      require: [true],
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
