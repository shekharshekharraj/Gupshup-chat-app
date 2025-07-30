import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js"; // Import Conversation model
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// REFACTORED getMessages function
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const myId = req.user._id;

		// Find the conversation between the two users
		const conversation = await Conversation.findOne({
			participants: { $all: [myId, userToChatId] },
		}).populate("messages"); // .populate() gets the actual message objects, not just their IDs

		if (!conversation) {
			return res.status(200).json([]); // No messages yet, return empty array
		}

		res.status(200).json(conversation.messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// REFACTORED sendMessage function
export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// 1. Find if a conversation already exists
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		// 2. If not, create a new conversation
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// 3. Handle image upload if present
		let imageUrl;
		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url;
		}

		// 4. Create the new message
		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image: imageUrl,
		});

		// 5. Add the message to the conversation and save both
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        // This will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// 6. Emit the message via Socket.IO to the receiver
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};