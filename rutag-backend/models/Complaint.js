import mongoose from 'mongoose';

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

const ComplaintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  images: [String], // Array of image URLs
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Complaint Registered',
        'Complaint Verified',
        'Site Inspection Scheduled',
        'Site Inspection Completed',
        'Action Plan Developed',
        'Work Order Issued',
        'Work in Progress',
        'Work Completed',
        'Final Inspection',
        'Complaint Resolved'],
    default: 'Complaint Registered',
    required: true,
  },
  statusHistory: [
    {
      status: { type: String },
      timestamp: { type: Date },
    }
  ],
});



ComplaintSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory = [{
      status: 'Complaint Registered',
      timestamp: this.date || new Date()
    }];
  }
  next();
});



// Update statusHistory when status is changed
ComplaintSchema.methods.updateStatus = async function (newStatus) {
  const currentStatusIndex = statuses.indexOf(this.status);
  const newStatusIndex = statuses.indexOf(newStatus);

  console.log(`Updating status from ${this.status} to ${newStatus}`);

  if (newStatusIndex > currentStatusIndex) {
    for (let i = currentStatusIndex; i <= newStatusIndex; i++) {
      const status = statuses[i];
      const existingEntry = this.statusHistory.find(
        (entry) => entry.status === status
      );

      if (!existingEntry) {
        this.statusHistory.push({
          status: statuses[i],
          timestamp: new Date(),
        });
        console.log(`Added status ${status} at ${new Date().toLocaleString()}`);
      }
    }
  }

  this.status = newStatus;
  console.log('Updated statusHistory:', this.statusHistory);
  await this.save(); // Save operation is awaited
};


const Complaint = mongoose.model('Complaint', ComplaintSchema);

export default Complaint;
