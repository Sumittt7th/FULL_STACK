# Backend API

This is a backend API for managing Users, Content, Forms, Media, and SEO configurations. It is built with **Node.js** and **Express** and connects to a **MongoDB** database. The API is fully RESTful and includes authentication, validation, and role-based access control for admins.

## Features

- **User Management**: Create, read, update, delete, and authenticate users with roles (Admin, User).
- **Content Management**: Create, update, delete, and view content with support for categories, tags, and SEO configurations.
- **Form Management**: Manage forms with dynamic fields and validation rules.
- **Media Management**: Upload, retrieve, and delete media files.
- **SEO Management**: Create or update SEO settings for content and pages.

## Prerequisites

Before running the application, ensure that you have the following installed on your machine:

- **Node.js** (version 14.x or higher)
- **MongoDB** (local or cloud-based like MongoDB Atlas)

## Installation

### 1. Clone the repository


git clone https://github.com/Sumittt7th/FULL_STACK/tree/main/backend

### 2. Install dependencies
Navigate into the project directory and run the following command to install all the necessary dependencies:


cd backend-api
npm install

### 3. Environment Variables
Create a .env file in the root of the project and add the following environment variables:

.env

PORT=3000
MONGO_URI=mongodb://localhost:27017/backend-api
SECRET_KEY=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
JWT_EXPIRATION=1h
Make sure to replace your-secret-key, your-cloud-name, your-api-key, and your-api-secret with actual values.

### 4. Run the Application
Once the environment variables are set, you can run the application:

npm start
The server will start on the specified port (default is 3000).

API Documentation
# 1. User Routes
GET /users: Get all users (Admin only)
GET /users/:id: Get user by ID
POST /users: Create a new user
PUT /users/:id: Update user details (Admin only)
PATCH /users/:id: Edit user (Admin only)
DELETE /users/:id: Delete user (Admin only)
POST /users/login: Login user
POST /users/logout: Logout user
POST /users/reftoken: Refresh token
POST /users/forgotPassword: Request a password reset
POST /users/reset-password: Reset user password
POST /users/changePassword/:id: Change user password (Authenticated)
# 2. Content Routes
GET /content: Get all content (Authenticated)
GET /content/:id: Get content by ID (Authenticated)
POST /content: Create new content (Admin only)
PUT /content/:id: Update content (Admin only)
DELETE /content/:id: Delete content (Admin only)
# 3. Form Routes
GET /forms: Get all forms (Authenticated)
GET /forms/:id: Get form by ID (Authenticated)
POST /forms: Create new form (Admin only)
PUT /forms/:id: Update form (Admin only)
DELETE /forms/:id: Delete form (Admin only)
# 4. Media Routes
POST /media/upload: Upload media (Admin only)
GET /media: Get all media (Authenticated)
GET /media/:id: Get media by ID (Authenticated)
DELETE /media/:id: Delete media (Admin only)
# 5. SEO Routes
POST /seo: Create or update SEO settings (Admin only)
GET /seo/:url: Get SEO by URL
GET /seo: Get all SEO settings (Authenticated)
Authentication & Authorization
The API uses JWT (JSON Web Token) for authentication. When a user logs in, a token is generated and needs to be included in the Authorization header for subsequent requests.
Role-based Access Control (RBAC): Only users with the ADMIN role can access certain routes, such as creating, updating, and deleting resources.
Example of the Authorization header with JWT token:


Authorization: Bearer <your-jwt-token>
API Example Requests
# 1. Login

POST /users/login
{
  "email": "user@example.com",
  "password": "password123"
}
# 2. Create Content

POST /content
Authorization: Bearer <your-jwt-token>
{
  "title": "Sample Content",
  "body": "This is the body of the content.",
  "category": "Technology",
  "tags": ["tech", "software"],
  "author": "admin"
}
# 3. Upload Media

POST /media/upload
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data
{
  "file": <binary file>
}
### Testing
You can use Postman or Insomnia to test the API routes. Make sure to include the JWT token in the Authorization header for authenticated requests.

### Contribution
If you wish to contribute to this project, please fork the repository, make your changes, and create a pull request. Ensure that your code is well-documented and tested.

### License
This project is licensed under the MIT License - see the LICENSE file for details.



### Explanation of the README:

- **Installation**: Describes the necessary steps for installing and setting up the project on your machine.
- **API Documentation**: Lists all the available routes in the backend API, including the type of request, required roles, and a brief description.
- **Authentication & Authorization**: Explains how authentication works with JWT and role-based access control.
- **API Example Requests**: Provides examples for making requests to login, create content, and upload media.
- **Testing**: Suggests tools like Postman or Insomnia for testing the API.
- **Contribution**: Encourages contributions from others and provides guidelines for doing so.



# Frontend Application - React + Vite

This is a frontend application built with **React** and **Vite** for the **[Your Project Name]**. It communicates with a backend API and offers a fully-featured user interface with authentication, content management, media, SEO settings, and user profiles.

## Features

- **User Authentication**: Secure login and registration, password reset, and authentication flow.
- **Role-Based Access**: Different views for Admins and Users, protecting routes accordingly.
- **Content Management**: CRUD operations for content creation and updates.
- **Forms Management**: Ability to create and manage dynamic forms.
- **Media Management**: View and upload media files.
- **SEO Management**: Manage SEO settings for pages and content.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Lazy Loading**: Lazy-load components for better performance.

## Prerequisites

Before running the frontend application, ensure that you have the following installed on your machine:

- **Node.js** (version 14.x or higher)
- **npm** or **yarn** (for managing dependencies)

## Installation

### 1. Clone the repository


git clone https://github.com/Sumittt7th/FULL_STACK/tree/main/frontend
### 2. Install dependencies
Navigate into the project directory and install all the necessary dependencies:


cd frontend-application
npm install
or, if you prefer yarn:


yarn install
### 3. Configuration
Add environment variables in the .env file:

env

VITE_API_URL=http://localhost:3000
Replace http://localhost:3000 with the actual API URL if needed.

### 4. Run the Application
To start the development server:


npm run dev
or, with yarn:


yarn dev
The app will be available at http://localhost:3000.

## Routes
# Public Routes
These routes are accessible without authentication:

/home: Home page of the application.
/auth: Authentication page (login/signup).
/about: About page.
/contact: Contact page.
/forgot-password: Forgot password page.
/reset-password: Reset password page.
*: Fallback for 404 Not Found.
Protected Routes
These routes are only accessible to authenticated users:

# Dashboard
/dashboard: Displays either the Admin or User dashboard based on the role.
Profile
/profile: User profile page.
/editUser: Edit user details page.
/users: Admins can view all users here.
/changePassword: Change password page for authenticated users.

# Forms Management
/forms: Displays all forms for the user.
/forms/create: Create a new form (Admin only).
/forms/update/:id: Update a specific form (Admin only).

# Content Management
/contents: Displays all content.
/contents/create: Create new content (Admin only).
/contents/update/:id: Update a specific content (Admin only).

# Media Management
/medias: View all media files (Admin only).

# SEO Management
/seo: View and manage SEO settings for content and pages (Admin only).

# Directory Structure

frontend-application/
├── public/                    # Public assets and index.html file
├── src/                       # Source code of the application
│   ├── components/            # Reusable components (e.g., auth, forms, etc.)
│   ├── pages/                 # Pages for routing
│   ├── store/                 # Redux store and reducers
│   ├── layouts/               # Layout components
│   ├── App.js                 # Main app file with routing and logic
│   ├── index.js               # Entry point of the application
│   └── ...
├── .env                        # Environment variables
├── vite.config.js              # Vite configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation

## Components

ProtectedRoute: Component to protect routes based on user role.

LazyComponent: Lazy-loaded components for improved performance.

AuthPage: Login and signup page.

ResetPasswordPage: Page for password reset.

Profile, AdminDashboard, UserDashboard: User-specific dashboards and profiles.

Forms, Content, Media, SEO Components: Manage forms, content, media, and SEO settings.

API Integration

The frontend communicates with the backend API to fetch and manage data. Example API requests include fetching content, forms, media, and user data, as well as sending authentication requests.

# Example Login API Request


fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
})
  .then(response => response.json())
  .then(data => console.log('Login Successful:', data));
# Testing
You can run tests with:


npm test
or:


yarn test
Tests can be written using Jest, React Testing Library, or other testing frameworks.

# Contribution
If you wish to contribute to this project, please fork the repository, make your changes, and create a pull request. Ensure that your code is well-documented and tested.

# License
This project is licensed under the MIT License - see the LICENSE file for details.




