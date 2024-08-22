// Import necessary modules and your Complaint model
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Complaint from '../models/Complaint.js'; // Adjust the path as needed


dotenv.config();
// Function to manually update the status and ensure statusHistory is updated
const manuallyUpdateStatus = async (complaintId, newStatus) => {
  try {
    const mongoUri = 'mongodb+srv://varungawali47:kaihiwatari69@cluster0.dcwwx.mongodb.net/'
    // Connect to your MongoDB database
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Find the complaint by its ID
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      console.log('Complaint not found');
      return;
    }

    // Call the updateStatus method to update status and statusHistory
    await complaint.updateStatus(newStatus);

    console.log('Complaint status updated and statusHistory logged successfully');
  } catch (error) {
    console.error('Error updating complaint status:', error);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
  }
};

// Replace 'complaint-id-here' with the actual ID of the complaint you want to update
// Replace 'New Status' with the status you set manually in MongoDB Compass
manuallyUpdateStatus('66c346242c87b0f43cf22e1b', 'Site Inspection Completed');
