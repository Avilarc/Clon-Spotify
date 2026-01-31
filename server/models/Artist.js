import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: String,
  imageUrl: String,
  bio: String
});

export default mongoose.model('Artist', artistSchema);
