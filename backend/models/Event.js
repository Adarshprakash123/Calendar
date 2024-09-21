const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Event', eventSchema);
