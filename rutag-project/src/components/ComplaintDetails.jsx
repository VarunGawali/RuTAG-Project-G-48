import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the complaint ID from the URL
import io from 'socket.io-client';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [updates, setUpdates] = useState([]);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    // Fetch complaint details from the server
    fetch(`http://localhost:5000/api/complaints/${id}`)
      .then(response => response.json())
      .then(data => {
        setComplaint(data);
        setUpdates(data.updates || []);
      });

    // Listen for real-time updates for this specific complaint
    socket.emit('join-complaint', id);

    socket.on('complaint-update', (update) => {
      console.log('Received update:', update);
      setUpdates((prevUpdates) => [...prevUpdates, update]);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.emit('leave-complaint', id);
      socket.disconnect();
    };
  }, [id]);

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Complaint Details</h2>
      <p><strong>ID:</strong> {complaint._id}</p>
      <p><strong>Description:</strong> {complaint.description}</p>
      <p><strong>Status:</strong> {complaint.status}</p>

      <h3>Real-Time Updates</h3>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>{update.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintDetails;
