import express from 'express';
import authController from '../controllers/auth.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Public routes
 */
// Register new user
router.post('/register', authController.register);

// Request password reset
router.post('/reset-password', authController.requestPasswordReset);

/**
 * Protected routes (require authentication)
 */
// Get current user profile
router.get('/profile', verifyToken, authController.getProfile);

// Update current user profile
router.put('/profile', verifyToken, authController.updateProfile);

/**
 * Admin only routes
 */
// Get user by ID
router.get('/users/:uid', verifyToken, requireAdmin, authController.getUserById);

// Delete user
router.delete('/users/:uid', verifyToken, requireAdmin, authController.deleteUser);

// Set user role
router.put('/users/:uid/role', verifyToken, requireAdmin, authController.setUserRole);

export default router;
