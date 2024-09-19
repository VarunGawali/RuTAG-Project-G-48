import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import io from 'socket.io-client';

// Fetch function for getting complaints
const fetchComplaints = async () => {
  const response = await fetch('https://ru-tag-project-g-48-mw2m.vercel.app/api/complaints');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ComplaintsTable = () => {
  const queryClient = useQueryClient();
  const socket = io('https://ru-tag-project-g-48-mw2m.vercel.app', {
    withCredentials: true
  });

  // useQuery to fetch complaints
  const { data: complaints = [], error, isLoading, isError } = useQuery({
    queryKey: ['complaints'],
    queryFn: fetchComplaints,
    staleTime: 5000, 
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });

  // Listen for new complaints in real-time using socket.io
  useEffect(() => {
    socket.on('new-complaint', (data) => {
      console.log('New complaint submitted:', data);
      // Invalidate and refetch the complaints
      queryClient.invalidateQueries(['complaints']);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket, queryClient]);

  if (isLoading) {
    return <div>Loading complaints...</div>;
  }

  if (isError) {
    return <div>Error fetching complaints: {error.message}</div>;
  }

  return (
    <div id='inspection'>
      <h2 className='font-bold text-center text-2xl my-4'>Registered Complaints</h2>

      {/* Wrapper for making the table responsive */}
      <div className='hidden lg:block overflow-x-auto'>
        <table className='min-w-full border border-gray-500 my-8'>
          <thead>
            <tr className='bg-gray-200 border-b border-gray-500'>
              <th className='px-4 py-2 border-r border-gray-500'>ID</th>
              <th className='px-4 py-2 border-r border-gray-500'>Description</th>
              <th className='px-4 py-2 border-r border-gray-500'>Status</th>
              <th className='px-4 py-2 border-r border-gray-500'>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id} className='border-b border-gray-500'>
                <td className='px-4 py-2 border-r border-gray-500'>{complaint._id}</td>
                <td className='px-4 py-2 border-r border-gray-500'>{complaint.complaint}</td>
                <td className='px-4 py-2 border-r border-gray-500'>{complaint.status}</td>
                <td className='px-4 py-2 border-r border-gray-500'>
                  <Link to={`/complaints/${complaint._id}`} className='text-blue-500 hover:underline'>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Alternative: Card Layout for small screens */}
      <div className='lg:hidden'>
        {complaints.map(complaint => (
          <div key={complaint._id} className='mb-4 border border-gray-500 rounded-md p-4 bg-white shadow-md'>
            <div>
              <span className='font-bold'>ID:</span> {complaint._id}
            </div>
            <div className='mt-2'>
              <span className='font-bold'>Description:</span> {complaint.complaint}
            </div>
            <div className='mt-2'>
              <span className='font-bold'>Status:</span> {complaint.status}
            </div>
            <div className='mt-4'>
              <Link to={`/complaints/${complaint._id}`} className='text-blue-500 hover:underline'>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsTable;


