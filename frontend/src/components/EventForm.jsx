import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../services/firebase';

function EventForm({ setEvents, existingEvent, handleCloseEdit }) {
  const [title, setTitle] = useState(existingEvent ? existingEvent.title : '');
  const [description, setDescription] = useState(existingEvent ? existingEvent.description : '');
  const [date, setDate] = useState(existingEvent ? existingEvent.date : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = { title, description, date };

      if (!auth.currentUser) {
        console.error('User is not authenticated');
        return;
      }

      const token = await auth.currentUser.getIdToken();

      if (existingEvent) {
        // Editing an existing event
        const response = await axios.put(`http://localhost:5000/api/events/${existingEvent._id}`, newEvent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(prevEvents =>
          prevEvents.map(event => (event._id === existingEvent._id ? response.data : event))
        );
        handleCloseEdit(); // Close the edit form after submission
      } else {
        // Creating a new event
        const response = await axios.post('http://localhost:5000/api/events', newEvent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(prevEvents => [...prevEvents, response.data]);
        setTitle('');
        setDescription('');
        setDate('');
      }
    } catch (err) {
      console.error('Error creating or updating event:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Date & Time</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {existingEvent ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
}

export default EventForm;
