const express = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticate, getEvents);
router.post('/', authenticate, createEvent);
router.put('/:id', authenticate, updateEvent);
router.delete('/:id', authenticate, deleteEvent);

module.exports = router;
