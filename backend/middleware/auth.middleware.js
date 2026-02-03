import { auth } from '../config/firebase.config.js';
import { errorResponse, unauthorizedResponse } from '../utils/response.js';

/**
 * Middleware to verify Firebase ID token
 */
export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return unauthorizedResponse(res, 'No token provided');
        }

        const token = authHeader.split('Bearer ')[1];

        // Verify the token with Firebase
        const decodedToken = await auth.verifyIdToken(token);

        // Attach user info to request
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            role: decodedToken.role || 'user',
        };

        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        return unauthorizedResponse(res, 'Invalid or expired token');
    }
};

/**
 * Middleware to check if user has required role
 */
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return unauthorizedResponse(res, 'Authentication required');
        }

        if (!allowedRoles.includes(req.user.role)) {
            return unauthorizedResponse(res, 'Insufficient permissions');
        }

        next();
    };
};

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return unauthorizedResponse(res, 'Authentication required');
    }

    if (req.user.role !== 'admin') {
        return unauthorizedResponse(res, 'Admin access required');
    }

    next();
};

/**
 * Middleware to check if user is committee member or admin
 */
export const requireCommitteeOrAdmin = (req, res, next) => {
    if (!req.user) {
        return unauthorizedResponse(res, 'Authentication required');
    }

    if (req.user.role !== 'committee' && req.user.role !== 'admin') {
        return unauthorizedResponse(res, 'Committee or Admin access required');
    }

    next();
};

export default {
    verifyToken,
    requireRole,
    requireAdmin,
    requireCommitteeOrAdmin,
};
