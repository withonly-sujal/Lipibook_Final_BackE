import { auth, db } from '../config/firebase.config.js';
import { USER_ROLES, COLLECTIONS, STORAGE_LIMITS } from '../config/constants.js';
import { isValidEmail, isValidPassword } from '../utils/validators.js';

/**
 * Authentication Service
 */
class AuthService {
    /**
     * Register a new user
     */
    async register(email, password, displayName, role = USER_ROLES.USER) {
        try {
            // Validate inputs
            if (!isValidEmail(email)) {
                throw new Error('Invalid email format');
            }

            if (!isValidPassword(password)) {
                throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
            }

            // Create user in Firebase Auth
            const userRecord = await auth.createUser({
                email,
                password,
                displayName,
                emailVerified: false,
            });

            // Set custom claims for role
            await auth.setCustomUserClaims(userRecord.uid, { role });

            // Create user document in Firestore
            const userData = {
                email,
                displayName,
                role,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                storageUsed: 0,
                storageLimit: STORAGE_LIMITS.USER_DEFAULT,
                isActive: true,
                emailVerified: false,
            };

            await db.collection(COLLECTIONS.USERS).doc(userRecord.uid).set(userData);

            return {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
                role,
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    /**
     * Get user by UID
     */
    async getUserByUid(uid) {
        try {
            const userDoc = await db.collection(COLLECTIONS.USERS).doc(uid).get();

            if (!userDoc.exists) {
                throw new Error('User not found');
            }

            return {
                uid,
                ...userDoc.data(),
            };
        } catch (error) {
            console.error('Get user error:', error);
            throw error;
        }
    }

    /**
     * Get user by email
     */
    async getUserByEmail(email) {
        try {
            const userRecord = await auth.getUserByEmail(email);
            const userDoc = await db.collection(COLLECTIONS.USERS).doc(userRecord.uid).get();

            if (!userDoc.exists) {
                throw new Error('User document not found');
            }

            return {
                uid: userRecord.uid,
                ...userDoc.data(),
            };
        } catch (error) {
            console.error('Get user by email error:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     */
    async updateProfile(uid, updates) {
        try {
            const allowedUpdates = ['displayName', 'storageLimit'];
            const filteredUpdates = {};

            for (const key of allowedUpdates) {
                if (updates[key] !== undefined) {
                    filteredUpdates[key] = updates[key];
                }
            }

            filteredUpdates.updatedAt = new Date().toISOString();

            await db.collection(COLLECTIONS.USERS).doc(uid).update(filteredUpdates);

            // Update Firebase Auth if displayName changed
            if (updates.displayName) {
                await auth.updateUser(uid, { displayName: updates.displayName });
            }

            return await this.getUserByUid(uid);
        } catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    }

    /**
     * Delete user account
     */
    async deleteUser(uid) {
        try {
            // Delete from Firebase Auth
            await auth.deleteUser(uid);

            // Delete from Firestore
            await db.collection(COLLECTIONS.USERS).doc(uid).delete();

            return { success: true, message: 'User deleted successfully' };
        } catch (error) {
            console.error('Delete user error:', error);
            throw error;
        }
    }

    /**
     * Generate password reset link
     */
    async generatePasswordResetLink(email) {
        try {
            const link = await auth.generatePasswordResetLink(email);
            return link;
        } catch (error) {
            console.error('Password reset link error:', error);
            throw error;
        }
    }

    /**
     * Verify ID token
     */
    async verifyToken(idToken) {
        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            console.error('Token verification error:', error);
            throw error;
        }
    }

    /**
     * Set custom user claims (role)
     */
    async setUserRole(uid, role) {
        try {
            await auth.setCustomUserClaims(uid, { role });
            await db.collection(COLLECTIONS.USERS).doc(uid).update({
                role,
                updatedAt: new Date().toISOString(),
            });

            return { success: true, message: 'Role updated successfully' };
        } catch (error) {
            console.error('Set user role error:', error);
            throw error;
        }
    }
}

export default new AuthService();
