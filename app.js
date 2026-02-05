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