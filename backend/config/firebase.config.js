import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Initialize Firebase Admin SDK
 * Supports two methods:
 * 1. Service Account JSON file (serviceAccountKey.json)
 * 2. Environment variables
 */
const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length > 0) {
      console.log('✅ Firebase Admin already initialized');
      return admin.app();
    }

    let credential;
    const serviceAccountPath = join(__dirname, '..', 'serviceAccountKey.json');

    // Method 1: Try to use service account JSON file
    if (existsSync(serviceAccountPath)) {
      console.log('📄 Using serviceAccountKey.json for Firebase Admin');
      const serviceAccountRaw = readFileSync(serviceAccountPath, 'utf8');
      const serviceAccount = JSON.parse(serviceAccountRaw);

      // Ensure private_key has proper newlines (fix Windows issue)
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }

      credential = admin.credential.cert(serviceAccount);
    }
    // Method 2: Use environment variables
    else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      console.log('🔑 Using environment variables for Firebase Admin');
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      };
      credential = admin.credential.cert(serviceAccount);
    }
    // No credentials found
    else {
      throw new Error(
        'Firebase credentials not found!\n' +
        'Please either:\n' +
        '1. Place serviceAccountKey.json in the backend folder, OR\n' +
        '2. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env file\n' +
        'See QUICK_FIX.md for instructions.'
      );
    }

    admin.initializeApp({
      credential,
      databaseURL: process.env.FIREBASE_DATABASE_URL || `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      // storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Disabled for now
    });

    console.log('✅ Firebase Admin initialized successfully (Auth + Firestore only)');
    return admin.app();
  } catch (error) {
    console.error('❌ Firebase Admin initialization error:', error.message);
    throw error;
  }
};

// Initialize Firebase
initializeFirebase();

// Export Firebase services
export const auth = admin.auth();
export const db = admin.firestore();
// Storage disabled for now - will be added later
// export const storage = admin.storage();
// export const bucket = admin.storage().bucket();

export default admin;
