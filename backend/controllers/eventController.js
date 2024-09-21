const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user.uid });
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const newEvent = new Event({ ...req.body, userId: req.user.uid });
  await newEvent.save();
  res.json(newEvent);
};

exports.updateEvent = async (req, res) => {
  const event = await Event.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.uid },
    req.body,
    { new: true }
  );
  res.json(event);
};

exports.deleteEvent = async (req, res) => {
  await Event.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
  res.json({ message: 'Event deleted' });
};
