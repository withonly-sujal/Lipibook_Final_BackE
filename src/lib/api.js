// API Client for Backend Communication
// This handles all API calls to the backend server

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class APIClient {
    /**
     * Make an authenticated request to the backend
     */
    async request(endpoint, options = {}) {
        try {
            // Get Firebase ID token from localStorage
            const token = typeof window !== 'undefined' ? localStorage.getItem('firebaseToken') : null;

            const config = {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                    ...options.headers,
                },
            };

            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentication endpoints
    async register(email, password, displayName, role = 'user') {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, displayName, role }),
        });
    }

    async resetPassword(email) {
        return this.request('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }

    async getProfile() {
        return this.request('/auth/profile');
    }

    async updateProfile(data) {
        return this.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Document endpoints
    async uploadDocument(file, conversionMode = 'auto') {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('conversionMode', conversionMode);

        const token = typeof window !== 'undefined' ? localStorage.getItem('firebaseToken') : null;

        const response = await fetch(`${API_BASE_URL}/documents/upload`, {
            method: 'POST',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: formData,
        });

        return response.json();
    }

    async getUserDocuments(limit = 50, offset = 0) {
        return this.request(`/documents?limit=${limit}&offset=${offset}`);
    }

    async getDocumentById(documentId) {
        return this.request(`/documents/${documentId}`);
    }

    async deleteDocument(documentId) {
        return this.request(`/documents/${documentId}`, {
            method: 'DELETE',
        });
    }

    async getConversionHistory(limit = 50) {
        return this.request(`/documents/history?limit=${limit}`);
    }

    // Committee endpoints
    async getPendingDocuments(limit = 50) {
        return this.request(`/documents/committee/pending?limit=${limit}`);
    }

    async reviewDocument(documentId, reviewStatus, comments = null) {
        return this.request(`/documents/${documentId}/review`, {
            method: 'POST',
            body: JSON.stringify({ reviewStatus, comments }),
        });
    }

    // Admin endpoints
    async getAllDocuments(limit = 50, offset = 0) {
        return this.request(`/documents/admin/all?limit=${limit}&offset=${offset}`);
    }

    async getUserById(uid) {
        return this.request(`/auth/users/${uid}`);
    }

    async setUserRole(uid, role) {
        return this.request(`/auth/users/${uid}/role`, {
            method: 'PUT',
            body: JSON.stringify({ role }),
        });
    }

    async deleteUser(uid) {
        return this.request(`/auth/users/${uid}`, {
            method: 'DELETE',
        });
    }
}

// Export singleton instance
export const api = new APIClient();
export default api;
