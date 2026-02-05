import Review from '../models/Review.js';
import Movie from '../models/Movie.js';

export const showNewReviewForm = async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  res.render('reviews/new', { movie });
};

export const createReview = async (req, res) => {
  await Review.create({
    rating: req.body.rating,
    comment: req.body.comment,
    movieId: req.params.movieId
  });

  res.redirect(`/movies/${req.params.movieId}`);
};