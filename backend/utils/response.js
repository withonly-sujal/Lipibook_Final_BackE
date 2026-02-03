/**
 * Response Utilities
 */

/**
 * Success response
 */
export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Error response
 */
export const errorResponse = (res, message = 'Error', statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};

/**
 * Validation error response
 */
export const validationErrorResponse = (res, errors) => {
    return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
    });
};

/**
 * Unauthorized response
 */
export const unauthorizedResponse = (res, message = 'Unauthorized access') => {
    return res.status(401).json({
        success: false,
        message,
    });
};

/**
 * Not found response
 */
export const notFoundResponse = (res, message = 'Resource not found') => {
    return res.status(404).json({
        success: false,
        message,
    });
};

export default {
    successResponse,
    errorResponse,
    validationErrorResponse,
    unauthorizedResponse,
    notFoundResponse,
};
