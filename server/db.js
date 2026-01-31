import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    // Try connecting to local MongoDB first with a short timeout
    console.log('Attempting to connect to Local MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/metal-spotify', {
        serverSelectionTimeoutMS: 2000
    });
    console.log('Connected to Local MongoDB 🤘');
  } catch (err) {
    console.log('Local MongoDB not found or refused connection.');
    console.log('Starting In-Memory MongoDB (this might take a moment to download binary first time)...');
    
    try {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log('Connected to In-Memory MongoDB 🤘');
        console.log(`URI: ${uri}`);
    } catch (memErr) {
        console.error('Failed to start In-Memory MongoDB:', memErr);
        process.exit(1);
    }
  }
};

export const disconnectDB = async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
};
