import { Server } from "socket.io";

let io;
const userSocketMap = {}; // {userId: socketId}

export const initializeSocketIO = (server) => {
	io = new Server(server, {
		pingTimeout: 60000,
		pingInterval: 25000,
		cors: {
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		},
	});

	io.on("connection", (socket) => {
		console.log("A user connected", socket.id);
		const userId = socket.handshake.query.userId;

		if (userId && userId !== "undefined") {
			userSocketMap[userId] = socket.id;
		}

		io.emit("getOnlineUsers", Object.keys(userSocketMap));

		socket.on("disconnect", () => {
			console.log("A user disconnected", socket.id);
			delete userSocketMap[userId];
			io.emit("getOnlineUsers", Object.keys(userSocketMap));
		});
	});

	return io;
};

export const getReceiverSocketId = (userId) => {
	return userSocketMap[userId];
};

// Export the io instance so it can be used in controllers
export { io };