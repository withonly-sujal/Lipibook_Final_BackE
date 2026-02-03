import { db } from '../config/firebase.config.js';
import { COLLECTIONS, DOCUMENT_STATUS, REVIEW_STATUS, ACTION_TYPES } from '../config/constants.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Document Service
 */
class DocumentService {
    /**
   * Upload document
   * Note: Files are stored locally for now. Firebase Storage will be added later.
   */
    async uploadDocument(userId, file, conversionMode = 'auto') {
        try {
            const documentId = uuidv4();
            const timestamp = new Date().toISOString();

            // For now, we'll store file path instead of uploading to Firebase Storage
            // Files are stored in memory by multer, we'll just save the metadata
            const fileUrl = `local://uploads/${userId}/${documentId}_${file.originalname}`;

            // Create document metadata in Firestore
            const documentData = {
                userId,
                fileName: file.originalname,
                originalFileUrl: fileUrl, // Local path for now
                convertedFileUrl: null,
                fileSize: file.size,
                fileType: file.mimetype,
                status: DOCUMENT_STATUS.PENDING,
                conversionMode,
                uploadedAt: timestamp,
                convertedAt: null,
                reviewStatus: REVIEW_STATUS.PENDING,
                reviewedBy: null,
                reviewedAt: null,
                metadata: {
                    pageCount: null,
                    language: 'modi',
                },
            };

            await db.collection(COLLECTIONS.DOCUMENTS).doc(documentId).set(documentData);

            // Log action in conversion history
            await this.logAction(documentId, userId, ACTION_TYPES.UPLOAD, {
                fileName: file.originalname,
                fileSize: file.size,
            });

            // Update user storage usage
            await this.updateUserStorage(userId, file.size);

            return {
                documentId,
                ...documentData,
            };
        } catch (error) {
            console.error('Upload document error:', error);
            throw error;
        }
    }

    /**
     * Get document by ID
     */
    async getDocumentById(documentId) {
        try {
            const docRef = await db.collection(COLLECTIONS.DOCUMENTS).doc(documentId).get();

            if (!docRef.exists) {
                throw new Error('Document not found');
            }

            return {
                documentId,
                ...docRef.data(),
            };
        } catch (error) {
            console.error('Get document error:', error);
            throw error;
        }
    }

    /**
     * Get user documents
     */
    async getUserDocuments(userId, limit = 50, offset = 0) {
        try {
            const snapshot = await db
                .collection(COLLECTIONS.DOCUMENTS)
                .where('userId', '==', userId)
                .orderBy('uploadedAt', 'desc')
                .limit(limit)
                .offset(offset)
                .get();

            const documents = [];
            snapshot.forEach((doc) => {
                documents.push({
                    documentId: doc.id,
                    ...doc.data(),
                });
            });

            return documents;
        } catch (error) {
            console.error('Get user documents error:', error);
            throw error;
        }
    }

    /**
     * Get all documents (Admin)
     */
    async getAllDocuments(limit = 50, offset = 0) {
        try {
            const snapshot = await db
                .collection(COLLECTIONS.DOCUMENTS)
                .orderBy('uploadedAt', 'desc')
                .limit(limit)
                .offset(offset)
                .get();

            const documents = [];
            snapshot.forEach((doc) => {
                documents.push({
                    documentId: doc.id,
                    ...doc.data(),
                });
            });

            return documents;
        } catch (error) {
            console.error('Get all documents error:', error);
            throw error;
        }
    }

    /**
     * Get pending documents for review (Committee)
     */
    async getPendingDocuments(limit = 50) {
        try {
            const snapshot = await db
                .collection(COLLECTIONS.DOCUMENTS)
                .where('reviewStatus', '==', REVIEW_STATUS.PENDING)
                .orderBy('uploadedAt', 'desc')
                .limit(limit)
                .get();

            const documents = [];
            snapshot.forEach((doc) => {
                documents.push({
                    documentId: doc.id,
                    ...doc.data(),
                });
            });

            return documents;
        } catch (error) {
            console.error('Get pending documents error:', error);
            throw error;
        }
    }

    /**
     * Update document status
     */
    async updateDocumentStatus(documentId, status, convertedFileUrl = null) {
        try {
            const updates = {
                status,
                updatedAt: new Date().toISOString(),
            };

            if (status === DOCUMENT_STATUS.COMPLETED && convertedFileUrl) {
                updates.convertedFileUrl = convertedFileUrl;
                updates.convertedAt = new Date().toISOString();
            }

            await db.collection(COLLECTIONS.DOCUMENTS).doc(documentId).update(updates);

            return await this.getDocumentById(documentId);
        } catch (error) {
            console.error('Update document status error:', error);
            throw error;
        }
    }

    /**
     * Review document (Approve/Reject)
     */
    async reviewDocument(documentId, reviewerId, reviewStatus, comments = null) {
        try {
            const updates = {
                reviewStatus,
                reviewedBy: reviewerId,
                reviewedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            if (comments) {
                updates.reviewComments = comments;
            }

            await db.collection(COLLECTIONS.DOCUMENTS).doc(documentId).update(updates);

            // Log action
            const action = reviewStatus === REVIEW_STATUS.APPROVED ? ACTION_TYPES.APPROVE : ACTION_TYPES.REJECT;
            await this.logAction(documentId, reviewerId, action, { comments });

            return await this.getDocumentById(documentId);
        } catch (error) {
            console.error('Review document error:', error);
            throw error;
        }
    }

    /**
   * Delete document
   * Note: Only deletes metadata from Firestore. Storage deletion will be added later.
   */
    async deleteDocument(documentId, userId) {
        try {
            const document = await this.getDocumentById(documentId);

            // Verify ownership (unless admin)
            if (document.userId !== userId) {
                throw new Error('Unauthorized to delete this document');
            }

            // Storage deletion will be added when Firebase Storage is enabled
            // For now, we only delete the Firestore document

            // Delete from Firestore
            await db.collection(COLLECTIONS.DOCUMENTS).doc(documentId).delete();

            // Update user storage
            await this.updateUserStorage(userId, -document.fileSize);

            // Log action
            await this.logAction(documentId, userId, ACTION_TYPES.DELETE, {
                fileName: document.fileName,
            });

            return { success: true, message: 'Document deleted successfully' };
        } catch (error) {
            console.error('Delete document error:', error);
            throw error;
        }
    }

    /**
     * Log action in conversion history
     */
    async logAction(documentId, userId, action, details = {}) {
        try {
            const historyData = {
                documentId,
                userId,
                action,
                timestamp: new Date().toISOString(),
                details,
            };

            await db.collection(COLLECTIONS.CONVERSION_HISTORY).add(historyData);
        } catch (error) {
            console.error('Log action error:', error);
            // Don't throw error for logging failures
        }
    }

    /**
     * Update user storage usage
     */
    async updateUserStorage(userId, sizeChange) {
        try {
            const userRef = db.collection(COLLECTIONS.USERS).doc(userId);
            const userDoc = await userRef.get();

            if (userDoc.exists) {
                const currentStorage = userDoc.data().storageUsed || 0;
                const newStorage = Math.max(0, currentStorage + sizeChange);

                await userRef.update({
                    storageUsed: newStorage,
                    updatedAt: new Date().toISOString(),
                });
            }
        } catch (error) {
            console.error('Update user storage error:', error);
            // Don't throw error for storage update failures
        }
    }

    /**
     * Get user's conversion history
     */
    async getUserHistory(userId, limit = 50) {
        try {
            const snapshot = await db
                .collection(COLLECTIONS.CONVERSION_HISTORY)
                .where('userId', '==', userId)
                .orderBy('timestamp', 'desc')
                .limit(limit)
                .get();

            const history = [];
            snapshot.forEach((doc) => {
                history.push({
                    historyId: doc.id,
                    ...doc.data(),
                });
            });

            return history;
        } catch (error) {
            console.error('Get user history error:', error);
            throw error;
        }
    }
}

export default new DocumentService();
