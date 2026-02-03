/**
 * Validation Utilities
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * Requirements: At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const isValidPassword = (password) => {
    if (password.length < 8) return false;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber;
};

/**
 * Validate file type
 */
export const isValidFileType = (mimeType, allowedTypes) => {
    return Object.values(allowedTypes).includes(mimeType);
};

/**
 * Validate file size
 */
export const isValidFileSize = (fileSize, maxSize) => {
    return fileSize <= maxSize;
};

/**
 * Validate user role
 */
export const isValidRole = (role, validRoles) => {
    return Object.values(validRoles).includes(role);
};

/**
 * Sanitize filename
 */
export const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
};

/**
 * Validate required fields
 */
export const validateRequiredFields = (data, requiredFields) => {
    const missingFields = [];

    for (const field of requiredFields) {
        if (!data[field] || data[field] === '') {
            missingFields.push(field);
        }
    }

    return {
        isValid: missingFields.length === 0,
        missingFields,
    };
};

export default {
    isValidEmail,
    isValidPassword,
    isValidFileType,
    isValidFileSize,
    isValidRole,
    sanitizeFilename,
    validateRequiredFields,
};
