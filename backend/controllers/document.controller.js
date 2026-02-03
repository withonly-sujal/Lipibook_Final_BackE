import documentService from '../services/document.service.js';
import { successResponse, errorResponse, validationErrorResponse } from '../utils/response.js';
import { REVIEW_STATUS } from '../config/constants.js';

/**
 * Document Controller
 */
class DocumentController {
    /**
     * Upload document
     * POST /api/documents/upload
     */
    async uploadDocument(req, res) {
        try {
            if (!req.file) {
                return validationErrorResponse(res, ['file']);
            }

            const { conversionMode } = req.body;
            const userId = req.user.uid;

            const document = await documentService.uploadDocument(userId, req.file, conversionMode);

            return successResponse(res, document, 'Document uploaded successfully', 201);
        } catch (error) {
            console.error('Upload document error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Get document by ID
     * GET /api/documents/:id
     */
    async getDocument(req, res) {
        try {
            const { id } = req.params;
            const document = await documentService.getDocumentById(id);

            // Check if user has access to this document
            if (document.userId !== req.user.uid && req.user.role !== 'admin' && req.user.role !== 'committee') {
                return errorResponse(res, 'Unauthorized access', 403);
            }

            return successResponse(res, document, 'Document retrieved successfully');
        } catch (error) {
            console.error('Get document error:', error);
            return errorResponse(res, error.message, 404);
        }
    }

    /**
     * Get user's documents
     * GET /api/documents
     */
    async getUserDocuments(req, res) {
        try {
            const userId = req.user.uid;
            const limit = parseInt(req.query.limit) || 50;
            const offset = parseInt(req.query.offset) || 0;

            const documents = await documentService.getUserDocuments(userId, limit, offset);

            return successResponse(res, documents, 'Documents retrieved successfully');
        } catch (error) {
            console.error('Get user documents error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Get all documents (Admin only)
     * GET /api/documents/all
     */
    async getAllDocuments(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 50;
            const offset = parseInt(req.query.offset) || 0;

            const documents = await documentService.getAllDocuments(limit, offset);

            return successResponse(res, documents, 'All documents retrieved successfully');
        } catch (error) {
            console.error('Get all documents error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Get pending documents for review (Committee)
     * GET /api/documents/pending
     */
    async getPendingDocuments(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 50;
            const documents = await documentService.getPendingDocuments(limit);

            return successResponse(res, documents, 'Pending documents retrieved successfully');
        } catch (error) {
            console.error('Get pending documents error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Update document status
     * PUT /api/documents/:id/status
     */
    async updateDocumentStatus(req, res) {
        try {
            const { id } = req.params;
            const { status, convertedFileUrl } = req.body;

            if (!status) {
                return validationErrorResponse(res, ['status']);
            }

            const document = await documentService.updateDocumentStatus(id, status, convertedFileUrl);

            return successResponse(res, document, 'Document status updated successfully');
        } catch (error) {
            console.error('Update document status error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Review document (Committee/Admin)
     * POST /api/documents/:id/review
     */
    async reviewDocument(req, res) {
        try {
            const { id } = req.params;
            const { reviewStatus, comments } = req.body;
            const reviewerId = req.user.uid;

            if (!reviewStatus || !Object.values(REVIEW_STATUS).includes(reviewStatus)) {
                return validationErrorResponse(res, ['reviewStatus']);
            }

            const document = await documentService.reviewDocument(id, reviewerId, reviewStatus, comments);

            return successResponse(res, document, 'Document reviewed successfully');
        } catch (error) {
            console.error('Review document error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Delete document
     * DELETE /api/documents/:id
     */
    async deleteDocument(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.uid;

            const result = await documentService.deleteDocument(id, userId);

            return successResponse(res, result, 'Document deleted successfully');
        } catch (error) {
            console.error('Delete document error:', error);
            return errorResponse(res, error.message, 400);
        }
    }

    /**
     * Get user's conversion history
     * GET /api/documents/history
     */
    async getUserHistory(req, res) {
        try {
            const userId = req.user.uid;
            const limit = parseInt(req.query.limit) || 50;

            const history = await documentService.getUserHistory(userId, limit);

            return successResponse(res, history, 'Conversion history retrieved successfully');
        } catch (error) {
            console.error('Get user history error:', error);
            return errorResponse(res, error.message, 400);
        }
    }
}

export default new DocumentController();
