# Lipibook Backend

Firebase-based backend for the Lipibook document conversion platform.

## 🚀 Features

- **Firebase Authentication**: User registration and login with role-based access
- **Firestore Database**: Document metadata and user data storage
- **Firebase Storage**: Secure file upload and storage
- **Role-Based Access Control**: User, Committee, and Admin roles
- **Document Management**: Upload, convert, review, and delete documents
- **RESTful API**: Express.js API with comprehensive endpoints

## 📋 Prerequisites

- Node.js (v18 or higher)
- Firebase project with Firestore and Storage enabled
- Firebase Admin SDK credentials

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials:

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the JSON file as `serviceAccountKey.json` (optional, for reference)
6. Copy the values to your `.env` file

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "displayName": "John Doe",
  "role": "user"  // Optional: "user" | "committee" | "admin"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <firebase_id_token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <firebase_id_token>
Content-Type: application/json

{
  "displayName": "New Name"
}
```

#### Request Password Reset
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Document Endpoints

#### Upload Document
```http
POST /api/documents/upload
Authorization: Bearer <firebase_id_token>
Content-Type: multipart/form-data

file: <file>
conversionMode: "auto" | "manual"
```

#### Get User Documents
```http
GET /api/documents?limit=50&offset=0
Authorization: Bearer <firebase_id_token>
```

#### Get Document by ID
```http
GET /api/documents/:id
Authorization: Bearer <firebase_id_token>
```

#### Get Conversion History
```http
GET /api/documents/history?limit=50
Authorization: Bearer <firebase_id_token>
```

#### Review Document (Committee/Admin)
```http
POST /api/documents/:id/review
Authorization: Bearer <firebase_id_token>
Content-Type: application/json

{
  "reviewStatus": "approved" | "rejected",
  "comments": "Optional review comments"
}
```

#### Delete Document
```http
DELETE /api/documents/:id
Authorization: Bearer <firebase_id_token>
```

### Admin Endpoints

#### Get All Documents
```http
GET /api/documents/admin/all?limit=50&offset=0
Authorization: Bearer <firebase_id_token>
```

#### Get User by ID
```http
GET /api/auth/users/:uid
Authorization: Bearer <firebase_id_token>
```

#### Delete User
```http
DELETE /api/auth/users/:uid
Authorization: Bearer <firebase_id_token>
```

#### Set User Role
```http
PUT /api/auth/users/:uid/role
Authorization: Bearer <firebase_id_token>
Content-Type: application/json

{
  "role": "user" | "committee" | "admin"
}
```

### Committee Endpoints

#### Get Pending Documents
```http
GET /api/documents/committee/pending?limit=50
Authorization: Bearer <firebase_id_token>
```

## 🗂️ Project Structure

```
backend/
├── config/
│   ├── firebase.config.js      # Firebase Admin SDK initialization
│   └── constants.js             # Application constants
├── controllers/
│   ├── auth.controller.js       # Authentication logic
│   └── document.controller.js   # Document management logic
├── middleware/
│   ├── auth.middleware.js       # Authentication & authorization
│   └── error.middleware.js      # Error handling
├── routes/
│   ├── auth.routes.js           # Authentication routes
│   └── document.routes.js       # Document routes
├── services/
│   ├── auth.service.js          # Authentication service
│   └── document.service.js      # Document service
├── utils/
│   ├── validators.js            # Validation utilities
│   └── response.js              # Response utilities
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies
├── server.js                    # Express server entry point
└── README.md                    # This file
```

## 🔐 User Roles

- **User**: Can upload, view, and delete their own documents
- **Committee**: Can review and approve/reject documents
- **Admin**: Full access to all operations

## 📦 Database Schema

### Collections

#### users
```javascript
{
  email: string,
  displayName: string,
  role: "user" | "committee" | "admin",
  createdAt: timestamp,
  updatedAt: timestamp,
  storageUsed: number,
  storageLimit: number,
  isActive: boolean,
  emailVerified: boolean
}
```

#### documents
```javascript
{
  userId: string,
  fileName: string,
  originalFileUrl: string,
  convertedFileUrl: string | null,
  fileSize: number,
  fileType: string,
  status: "pending" | "processing" | "completed" | "failed",
  conversionMode: "auto" | "manual",
  uploadedAt: timestamp,
  convertedAt: timestamp | null,
  reviewStatus: "pending" | "approved" | "rejected",
  reviewedBy: string | null,
  reviewedAt: timestamp | null
}
```

#### conversionHistory
```javascript
{
  documentId: string,
  userId: string,
  action: "upload" | "convert" | "download" | "delete" | "approve" | "reject",
  timestamp: timestamp,
  details: object
}
```

## 🧪 Testing

Test the server health:
```bash
curl http://localhost:5000/health
```

## 🔒 Security

- All routes (except registration and password reset) require authentication
- Role-based access control for sensitive operations
- File type and size validation
- Firebase Security Rules (to be deployed separately)

## 📝 Notes

- The server uses Firebase ID tokens for authentication
- Tokens should be obtained from Firebase Authentication on the frontend
- Include the token in the `Authorization` header as `Bearer <token>`

## 🤝 Contributing

This is a private project for Lipibook document conversion platform.

## 📄 License

ISC
