/**
 * Application Constants
 */

// User Roles
export const USER_ROLES = {
    USER: 'user',
    COMMITTEE: 'committee',
    ADMIN: 'admin',
};

// Document Status
export const DOCUMENT_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
};

// Review Status
export const REVIEW_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
};

// Conversion Mode
export const CONVERSION_MODE = {
    AUTO: 'auto',
    MANUAL: 'manual',
};

// File Types
export const ALLOWED_FILE_TYPES = {
    PDF: 'application/pdf',
    JPEG: 'image/jpeg',
    JPG: 'image/jpg',
    PNG: 'image/png',
};

// File Size Limits (in bytes)
export const FILE_SIZE_LIMITS = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
};

// Storage Limits (in bytes)
export const STORAGE_LIMITS = {
    USER_DEFAULT: 100 * 1024 * 1024, // 100MB
    USER_PREMIUM: 1024 * 1024 * 1024, // 1GB
    ADMIN_UNLIMITED: -1, // Unlimited
};

// Payment Status
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
};

// Payment Purpose
export const PAYMENT_PURPOSE = {
    CONVERSION: 'conversion',
    CONTRIBUTION: 'contribution',
};

// Action Types for History
export const ACTION_TYPES = {
    UPLOAD: 'upload',
    CONVERT: 'convert',
    DOWNLOAD: 'download',
    DELETE: 'delete',
    APPROVE: 'approve',
    REJECT: 'reject',
};

// Firestore Collection Names
export const COLLECTIONS = {
    USERS: 'users',
    DOCUMENTS: 'documents',
    FOLDERS: 'folders',
    CONVERSION_HISTORY: 'conversionHistory',
    PAYMENTS: 'payments',
};

// Storage Paths
export const STORAGE_PATHS = {
    USERS: 'users',
    DOCUMENTS: 'documents',
    ORIGINAL: 'original',
    CONVERTED: 'converted',
    PROFILE: 'profile',
};

export default {
    USER_ROLES,
    DOCUMENT_STATUS,
    REVIEW_STATUS,
    CONVERSION_MODE,
    ALLOWED_FILE_TYPES,
    FILE_SIZE_LIMITS,
    STORAGE_LIMITS,
    PAYMENT_STATUS,
    PAYMENT_PURPOSE,
    ACTION_TYPES,
    COLLECTIONS,
    STORAGE_PATHS,
};
