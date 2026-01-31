import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  year: Number,
  coverUrl: String,
});

export default mongoose.model('Album', albumSchema);
