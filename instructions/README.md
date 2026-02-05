# 🎬 Movie Ratings App (Full-Stack Integration Exercise)

You will build a **server-rendered full-stack app** using:

* **Node.js + Express**
* **MongoDB + Mongoose**
* **EJS (views)**

✅ This version uses **Controllers from the beginning** (so routes stay clean).

---

## 📁 Starting Point

You already have the project folder.

👉 Open the provided folder in **VS Code**.

---

## STEP 1: Configuration

### 1.1 Initialize NPM

```bash
npm init -y
```

### 1.2 Install packages

```bash
npm i express ejs mongoose dotenv method-override
npm i -D nodemon
```

### 1.3 Enable ES Modules

In **package.json**, add:

```json
"type": "module"
```

Update scripts:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

### 1.4 Create folder structure

```
project-root
│── app.js
│── .env
│
├── config
│   └── db.js
│
├── models
│   ├── Movie.js
│   └── Review.js
│
├── controllers
│   ├── movieController.js
│   └── reviewController.js
│
├── routes
│   ├── movieRoutes.js
│   └── reviewRoutes.js
│
├── views
│   ├── movies
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── reviews
│   │   └── new.ejs
│   └── partials
│       ├── header.ejs
│       └── footer.ejs
│
└── public
    └── styles.css
```

---

## STEP 2: Database Setup

### 2.1 Environment variables

Create **.env**:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/movieRatingsDB
```

### 2.2 DB connection helper (config/db.js)

```js
import mongoose from 'mongoose';

export const connectDB = async (mongoUri) => {
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};
```

---

## STEP 3: Models

### 3.1 Movie Model (models/Movie.js)

```js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  releaseYear: Number
});

export default mongoose.model('Movie', movieSchema);
```
>**Challenge:** Try adding required attribute to title

### 3.2 Review Model (models/Review.js)

```js
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
```
>Note: Understand what the type ObjectId does with Copilot/ChatGPT
---

## STEP 4: Controllers (Business Logic)

### 4.1 Movie Controller (controllers/movieController.js)

```js
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
```

### 4.2 Review Controller (controllers/reviewController.js)

```js
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
```

---

## STEP 5: Routes (Wiring Only)

Routes should be **thin**: just map URL → controller.

### 5.1 Movie Routes (routes/movieRoutes.js)

```js
import express from 'express';
import {
  getAllMovies,
  showNewMovieForm,
  createMovie,
  getMovieDetails
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/new', showNewMovieForm);
router.post('/', createMovie);
router.get('/:id', getMovieDetails);

export default router;
```

### 5.2 Review Routes (routes/reviewRoutes.js)

```js
import express from 'express';
import {
  showNewReviewForm,
  createReview
} from '../controllers/reviewController.js';

const router = express.Router({ mergeParams: true });

router.get('/new', showNewReviewForm);
router.post('/', createReview);

export default router;
```

---

## STEP 6: app.js (Server Setup)

```js
import express from 'express';
import dotenv from 'dotenv';
import methodOverride from 'method-override';

import { connectDB } from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

// View engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Routes
app.use('/movies', movieRoutes);
app.use('/movies/:movieId/reviews', reviewRoutes);

// DB + Start
await connectDB(process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```

---

## STEP 7: Views (EJS Frontend)

### 7.1 Movie List (views/movies/index.ejs)

```ejs
<h1>Movies</h1>
<a href="/movies/new">Add Movie</a>

<ul>
  <% movies.forEach(movie => { %>
    <li>
      <a href="/movies/<%= movie._id %>">
        <%= movie.title %> (<%= movie.releaseYear %>)
      </a>
    </li>
  <% }) %>
</ul>
```

### 7.2 Add Movie (views/movies/new.ejs)

```ejs
<h1>Add Movie</h1>

<form method="POST" action="/movies">
  <input name="title" placeholder="Title" required />
  <input name="genre" placeholder="Genre" />
  <input name="releaseYear" type="number" />
  <button>Add</button>
</form>

<a href="/movies">Cancel</a>
```

### 7.3 Movie Details + Reviews (views/movies/show.ejs)

```ejs
<h1><%= movie.title %></h1>
<p>Genre: <%= movie.genre %></p>
<p>Year: <%= movie.releaseYear %></p>

<a href="/movies/<%= movie._id %>/reviews/new">Add Review</a>

<hr />

<h2>Reviews</h2>

<% if (reviews.length === 0) { %>
  <p>No reviews yet. Be the first!</p>
<% } %>

<ul>
  <% reviews.forEach(r => { %>
    <li>
      <strong><%= r.rating %>/5</strong>
      <br />
      <%= r.comment %>
    </li>
  <% }) %>
</ul>

<a href="/movies">← Back to Movies</a>
```

### 7.4 Add Review (views/reviews/new.ejs)

```ejs
<h1>Add Review for <%= movie.title %></h1>

<form method="POST" action="/movies/<%= movie._id %>/reviews">
  <label>Rating (1–5)</label>
  <input type="number" name="rating" min="1" max="5" required />

  <label>Comment</label>
  <textarea name="comment" required></textarea>

  <button>Add Review</button>
</form>

<a href="/movies/<%= movie._id %>">Cancel</a>
```

---

## STEP 8: Run & Test

```bash
npm run dev
```

Visit:

* [http://localhost:3000/movies](http://localhost:3000/movies)

Test flow:

1. Add a movie
2. Click it to open details
3. Add a review
4. Confirm the review appears under that movie

---

## ✅ Key Learning Moments

* **Controllers hold logic** (business rules)
* **Routes are wiring only** (URL → controller)
* **Nested routes**: `/movies/:movieId/reviews`
* Why we need `mergeParams: true`
* How backend data flows into EJS

---

## Optional Extensions (If Time)

- If you're done with this exercise, head straight to the [Challenge](Challenge.md). 
- This is very similar to the movie app. But now, you can try re-creating all these steps independently for the new scenario !
