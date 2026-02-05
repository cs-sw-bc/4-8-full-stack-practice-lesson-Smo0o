import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  }
});

export default mongoose.model('Review', reviewSchema);