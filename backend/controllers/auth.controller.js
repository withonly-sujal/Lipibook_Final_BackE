import authService from '../services/auth.service.js';
import { successResponse, errorResponse, validationErrorResponse } from '../utils/response.js';
import { validateRequiredFields } from '../utils/validators.js';
import { USER_ROLES } from '../config/constants.js';

/**
 * Authentication Controller
 */
class AuthController {
    /**
     * Register new user
     * POST /api/auth/register
     */
    async register(req, res) {
        try {
            const { email, password, displayName, role } = req.body;

            // Validate required fields
            const validation = validateRequiredFields(req.body, ['email', 'password', 'displayName']);
            if (!validation.isValid) {
                return validationErrorResponse(res, validation.missingFields);
            }

            // Register user
            const user = await authService.register(
                email,
                password,
                displayName,
                role || USER_ROLES.USER
            );

            return successResponse(res, user, 'User registered successfully', 201);
        } catch (error) {
            console.error('Register error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Get user profile
     * GET /api/auth/profile
     */
    async getProfile(req, res) {
        try {
            const user = await authService.getUserByUid(req.user.uid);
            return successResponse(res, user, 'Profile retrieved successfully');
        } catch (error) {
            console.error('Get profile error:', error);
            return errorResponse(res, error.message, 404);
        }
    }

    /**
     * Update user profile
     * PUT /api/auth/profile
     */
    async updateProfile(req, res) {
        try {
            const updates = req.body;
            const user = await authService.updateProfile(req.user.uid, updates);
            return successResponse(res, user, 'Profile updated successfully');
        } catch (error) {
            console.error('Update profile error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Request password reset
     * POST /api/auth/reset-password
     */
    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return validationErrorResponse(res, ['email']);
            }

            const resetLink = await authService.generatePasswordResetLink(email);

            // In production, send email with reset link
            // For now, return the link
            return successResponse(res, { resetLink }, 'Password reset link generated');
        } catch (error) {
            console.error('Password reset error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Get user by ID (Admin only)
     * GET /api/auth/users/:uid
     */
    async getUserById(req, res) {
        try {
            const { uid } = req.params;
            const user = await authService.getUserByUid(uid);
            return successResponse(res, user, 'User retrieved successfully');
        } catch (error) {
            console.error('Get user error:', error);
            return errorResponse(res, error.message, 404);
        }
    }

    /**
     * Delete user (Admin only)
     * DELETE /api/auth/users/:uid
     */
    async deleteUser(req, res) {
        try {
            const { uid } = req.params;
            const result = await authService.deleteUser(uid);
            return successResponse(res, result, 'User deleted successfully');
        } catch (error) {
            console.error('Delete user error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Set user role (Admin only)
     * PUT /api/auth/users/:uid/role
     */
    async setUserRole(req, res) {
        try {
            const { uid } = req.params;
            const { role } = req.body;

            if (!role) {
                return validationErrorResponse(res, ['role']);
            }

            const result = await authService.setUserRole(uid, role);
            return successResponse(res, result, 'User role updated successfully');
        } catch (error) {
            console.error('Set user role error:', error);
            return errorResponse(res, error.message, 400);
        }
    }
}

export default new AuthController();
