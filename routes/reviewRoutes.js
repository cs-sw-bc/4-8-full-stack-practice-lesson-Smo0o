import express from 'express';
import {
  showNewReviewForm,
  createReview
} from '../controllers/reviewController.js';

const router = express.Router({ mergeParams: true });

router.get('/new', showNewReviewForm);
router.post('/', createReview);

export default router;