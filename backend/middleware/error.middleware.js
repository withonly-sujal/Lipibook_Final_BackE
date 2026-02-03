import { errorResponse } from '../utils/response.js';

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Firebase errors
    if (err.code && err.code.startsWith('auth/')) {
        return errorResponse(res, err.message, 401);
    }

    // Multer file upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return errorResponse(res, 'File size exceeds limit', 400);
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return errorResponse(res, 'Unexpected file field', 400);
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    return errorResponse(res, message, statusCode);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
    return errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};

export default {
    errorHandler,
    notFoundHandler,
};
