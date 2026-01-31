import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
  duration: String, // e.g., "3:45"
  audioUrl: String,
});

export default mongoose.model('Song', songSchema);
