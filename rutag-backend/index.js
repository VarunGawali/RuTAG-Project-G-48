import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import complaintRoutes from './routes/complaints.js';
import Complaint from './models/Complaint.js';

import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(cors({
  origin: "http://localhost:5173", // URL of your frontend
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// Middleware
app.use(express.json());


app.use('/', complaintRoutes);
app.use('/api/complaints', complaintRoutes);

// Pass io instance to routes
app.set('io', io);


const mongoUri = process.env.MONGODB_URI

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Routes
app.get('/', async (req, res) => {
  /*try {
    // Fetch all complaints from the database
    const complaints = await Complaint.find();

    res.json(complaints);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Server error' });
  }*/

    
  res.send('Server is running');
    
});

app.get('/api/complaints/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Real-time connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new-complaint', (complaint) => {
    io.emit('new-complaint', complaint);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
