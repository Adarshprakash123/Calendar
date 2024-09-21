import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../services/firebase';
import EventForm from './EventForm';

function EventList({ events, setEvents }) {
  const [editingEvent, setEditingEvent] = useState(null);

  // Delete an event
  const handleDelete = async (id) => {
    try {
      if (!auth.currentUser) {
        console.error('User is not authenticated');
        return;
      }

      const token = await auth.currentUser.getIdToken();
      const response = await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setEvents(events.filter(event => event._id !== id));
      }
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  // Set the event to be edited
  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  // Close the edit form
  const handleCloseEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div>
      {editingEvent && (
        <div className="mb-4">
          <h2>Edit Event</h2>
          <EventForm setEvents={setEvents} existingEvent={editingEvent} handleCloseEdit={handleCloseEdit} />
        </div>
      )}
      <ul className="space-y-4">
        {events.length === 0 ? (
          <li>No events found.</li>
        ) : (
          events.map(event => (
            <li key={event._id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleString()}</p>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mt-2 ml-2"
                onClick={() => handleEdit(event)}
              >
                Edit
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default EventList;
