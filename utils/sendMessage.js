import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const dbUrl = Constants.expoConfig.extra.dbUrl;

import generateChatId from "./generateChatId";
import findUser from "./findUser.js";

const sendMessage = async (participants, message) => {
	try {
		if (participants && participants.sender && participants.receiver) {
			const chatId = await generateChatId(
				[participants.sender, participants.receiver].sort()
			);
			const token = await AsyncStorage.getItem("idToken");
			if (!token) router.push("Auth");
			const chatExistsResponse = await axios.get(
				`${dbUrl}/chats/${chatId}.json?auth=${token}`
			);
			const participant1 = await findUser(participants.sender);
			const participant2 = await findUser(participants.receiver);
			const users = {
				user1: {
					username: participant1[1][1],
					userId: participants.sender
				},
				user2: {
					username: participant2[1][1],
					userId: participants.receiver
				}
			};

			if (!chatExistsResponse.data && participant1 && participant2) {
				await axios.put(`${dbUrl}/chats/${chatId}.json?auth=${token}`, {
					users,
					messages: {}
				});
			}

			const messageId = new Date().getTime();
			await axios.put(
				`${dbUrl}/chats/${chatId}/messages/${messageId}.json?auth=${token}`,
				{
					sender: participants.sender,
					receiver: participants.receiver,
					message,
					timestamp: new Date().toISOString()
				}
			);
		} else {
			console.error("Error: Invalid participants object");
		}
	} catch (error) {
		console.error("Error sending message:", error);
	}
};

export default sendMessage;
