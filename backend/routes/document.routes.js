import express from 'express';
import multer from 'multer';
import documentController from '../controllers/document.controller.js';
import { verifyToken, requireAdmin, requireCommitteeOrAdmin } from '../middleware/auth.middleware.js';
import { ALLOWED_FILE_TYPES, FILE_SIZE_LIMITS } from '../config/constants.js';

const router = express.Router();

/**
 * Configure Multer for file uploads
 */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (Object.values(ALLOWED_FILE_TYPES).includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF and images are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: FILE_SIZE_LIMITS.MAX_FILE_SIZE,
    },
});

/**
 * Document routes (all require authentication)
 */

// Upload document
router.post('/upload', verifyToken, upload.single('file'), documentController.uploadDocument);

// Get user's documents
router.get('/', verifyToken, documentController.getUserDocuments);

// Get user's conversion history
router.get('/history', verifyToken, documentController.getUserHistory);

// Get document by ID
router.get('/:id', verifyToken, documentController.getDocument);

// Update document status (Admin only)
router.put('/:id/status', verifyToken, requireAdmin, documentController.updateDocumentStatus);

// Review document (Committee/Admin)
router.post('/:id/review', verifyToken, requireCommitteeOrAdmin, documentController.reviewDocument);

// Delete document
router.delete('/:id', verifyToken, documentController.deleteDocument);

/**
 * Admin routes
 */
// Get all documents (Admin only)
router.get('/admin/all', verifyToken, requireAdmin, documentController.getAllDocuments);

/**
 * Committee routes
 */
// Get pending documents for review (Committee/Admin)
router.get('/committee/pending', verifyToken, requireCommitteeOrAdmin, documentController.getPendingDocuments);

export default router;
