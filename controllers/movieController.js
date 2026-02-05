import Movie from '../models/Movie.js';
import Review from '../models/Review.js';

export const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.render('movies/index', { movies });
};

export const showNewMovieForm = (req, res) => {
  res.render('movies/new');
};

export const createMovie = async (req, res) => {
  await Movie.create(req.body);
  res.redirect('/movies');
};

export const getMovieDetails = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  const reviews = await Review.find({ movieId: req.params.id });

  res.render('movies/show', { movie, reviews });
};