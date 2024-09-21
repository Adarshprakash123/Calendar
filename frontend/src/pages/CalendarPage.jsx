import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../services/firebase';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null); // This should be set based on your app's auth logic

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated');
          return;
        }

        const token = await auth.currentUser.getIdToken();
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Events</h1>
      <EventForm setEvents={setEvents} />
      <EventList events={events} setEvents={setEvents} />
    </div>
  );
}

export default CalendarPage;
