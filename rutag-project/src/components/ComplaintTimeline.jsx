import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const statuses = [
  'Complaint Registered',
  'Complaint Verified',
  'Site Inspection Scheduled',
  'Site Inspection Completed',
  'Action Plan Developed',
  'Work Order Issued',
  'Work in Progress',
  'Work Completed',
  'Final Inspection',
  'Complaint Resolved'
];

// Fetch function for getting a specific complaint
const fetchComplaint = async (id) => {
  const response = await fetch(`https://ru-tag-project-g-48-mw2m.vercel.app/api/complaints/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ComplaintTimeline = () => {
  const { id } = useParams();

  // useQuery to fetch the specific complaint details
  const { data: complaint, error, isLoading, isError } = useQuery({
    queryKey: ['complaint', id],
    queryFn: () => fetchComplaint(id),
    refetchInterval: 5000,
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching complaint: {error.message}</div>;
  }

  const currentStatusIndex = statuses.indexOf(complaint.status);

  return (
    <div>
      <h2 className='text-4xl font-bold text-center my-6'>Complaint Timeline</h2>
      <h4 className='text-l text-center'>[{complaint._id}; {complaint.complaint}; {complaint.address}]</h4>
      <VerticalTimeline>
        {statuses.map((status, index) => {
          const historyEntry = complaint?.statusHistory?.find(
            (entry) => entry.status === status
          );
          return (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={historyEntry?.timestamp ? new Date(historyEntry.timestamp).toLocaleString() : 'Pending'}
              iconStyle={{
                background: index <= currentStatusIndex ? 'green' : 'gray', // Green up to current, gray after
                color: '#fff'
              }}
            >
              <h3 className="vertical-timeline-element-title">{status}</h3>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};

export default ComplaintTimeline;


