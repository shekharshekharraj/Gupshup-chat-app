Gupshup: A Real-Time Communication Platform
Introduction

Gupshup is a full-stack, real-time chat application engineered utilizing the MERN stack, which comprises MongoDB, Express.js, React, and Node.js. The platform is designed to provide a seamless and interactive communication experience, offering a suite of features including one-on-one messaging, user presence monitoring, and multimedia content sharing.

Core Features
Real-Time Messaging: Facilitates the instantaneous delivery of messages through the implementation of Socket.IO.
User Authentication: Incorporates a secure user registration and login system employing JSON Web Tokens (JWTs), which are stored in HTTP-only cookies to enhance security.
Private Conversations: Enables confidential, one-on-one communication channels between registered users.
Presence Indication: Provides functionality to display the online status of users in real time.
Image Sharing: Allows users to upload and transmit image files within conversations, a feature powered by the Cloudinary service.
Profile Management: Offers users the capability to customize their profiles by updating their display pictures.
Customizable Theming: Features a selection of visual themes, built with daisyUI, allowing for extensive personalization of the user interface.
Responsive Design: Employs a clean, contemporary user interface, developed with React and Tailwind CSS, that ensures optimal functionality across a wide range of device screen sizes.
Technology Stack

Backend Architecture
Node.js: Serves as the JavaScript runtime environment.
Express.js: Utilized as the primary web framework for Node.js.
MongoDB: Functions as the NoSQL database for the persistence of user and message data.
Mongoose: Employed as the Object Data Modeling (ODM) library for MongoDB.
Socket.IO: Enables real-time, bidirectional event-based communication.
JSON Web Token (jsonwebtoken): Implemented for secure user authentication protocols.
Cloudinary: Integrated for cloud-based management of image assets.
bcryptjs: Used for the cryptographic hashing of user passwords.

Frontend Architecture
React: Serves as the core JavaScript library for constructing the user interface.
Vite: Utilized as the next-generation frontend build tool to ensure an efficient development workflow.
Zustand: Implemented as a minimalistic, high-performance state-management solution.
React Router: Manages client-side navigation and routing.
Socket.IO Client: Provides the client-side library for connecting to the real-time server.
Tailwind CSS: A utility-first CSS framework used for the rapid development of the user interface.
daisyUI: Functions as a component library for Tailwind CSS.
Axios: Employed for executing HTTP requests to the backend's application programming interface (API).

Project Implementation Guide
The following instructions provide a comprehensive guide for establishing a local instance of the project for development and testing objectives.
System Prerequisites
Node.js (version 14 or a subsequent release)
Node Package Manager (npm)
An active MongoDB Atlas account or a locally installed MongoDB instance
A Cloudinary service account

Installation and Configuration
Clone the Project Repository:
git clone <your-repository-url>
cd <your-repository-folder>


Backend Environment Setup:
Navigate to the backend directory:
cd src


Execute the installation of required dependencies:
npm install


In the src directory, create a new file named .env and populate it with the subsequent environment variables, substituting the placeholder values with your specific service credentials.
PORT=5001
NODE_ENV=development

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-url>/

# JWT Secret Key
JWT_SECRET=your_jwt_secret_here

# Cloudinary API Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Frontend Environment Setup:
From the project's root directory, navigate to the frontend directory:
cd frontend


Execute the installation of required dependencies:
npm install


Application Execution
Initiate the Backend Server:
Within the src directory, execute the following command:
npm run dev


The server will initialize on the port specified in the .env configuration file (e.g., http://localhost:5001).
Initiate the Frontend Development Server:
Within the frontend directory, execute the following command:
npm run dev


The React application will subsequently launch in your default web browser, accessible at http://localhost:5173.
Operational Procedures
Account Registration: Proceed to the signup page to create a minimum of two distinct user accounts for testing purposes.
User Authentication: Authenticate into the application using one of the newly created accounts.

