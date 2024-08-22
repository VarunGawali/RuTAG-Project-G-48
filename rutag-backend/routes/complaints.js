import 'dotenv/config'; 

import express from 'express';
import multer from 'multer';
import path from 'path';
import Complaint from '../models/Complaint.js';

import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const router = express.Router();

// Multer setup for file uploads
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});*/



const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});



const storage = multer.memoryStorage(); // Store files in memory for streaming to S3
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
}).array('images', 5);


// Submit a complaint
router.post('/api/complaints/submit', upload, async (req, res) => {
  console.log('Files:', req.files);
  console.log('Body:', req.body);

  console.log('AWS Region:', process.env.AWS_REGION);
  console.log('AWS Access Key ID:', process.env.AWS_ACCESS_KEY_ID);
  console.log('AWS Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY);


  try {
    const { userId, address, latitude, longitude, complaint } = req.body;

    if (!address || !complaint) {
      return res.status(400).json({ error: 'Address and complaint are required' });
    }

    const images = await Promise.all(req.files.map(async (file) => {
      const upload = new Upload({
        client: s3,
        params: {
          Bucket: 'rutag-bucket',
          Key: `complaints/${Date.now().toString()}${path.extname(file.originalname)}`,
          Body: file.buffer,
          ACL: 'public-read',
        },
      });
      const result = await upload.done();
      return result.Location; // S3 URL
    }));

    const newComplaint = new Complaint({
      userId,
      address,
      latitude,
      longitude,
      complaint,
      images,
      status: 'Complaint Registered',
    });

    const savedComplaint = await newComplaint.save();

    // Emit real-time update
    req.app.get('io').emit('new-complaint', savedComplaint);

    res.status(201).json(savedComplaint);
  } catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
});

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ error: 'No complaints found' });
    }
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
