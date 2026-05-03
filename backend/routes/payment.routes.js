import express from 'express';
import paymentController from '../controllers/payment.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Payment routes
 * All routes require authentication
 */

// Create a new Razorpay order
router.post('/create-order', verifyToken, paymentController.createOrder);

// Verify payment after completion
router.post('/verify', verifyToken, paymentController.verifyPayment);

// Get payment summary (total transactions + total amount)
router.get('/summary', verifyToken, paymentController.getSummary);

export default router;
