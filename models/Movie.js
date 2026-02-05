import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  releaseYear: Number
});

export default mongoose.model('Movie', movieSchema);