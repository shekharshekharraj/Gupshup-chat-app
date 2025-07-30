import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http"; // Import the 'http' module

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initializeSocketIO } from "./lib/socket.js"; // Import the initializer

dotenv.config();

const app = express();
const server = http.createServer(app); // Create the HTTP server here
initializeSocketIO(server); // Attach Socket.IO to the server

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}

server.listen(PORT, () => {
	console.log("Server is running on PORT: " + PORT);
	connectDB();
});