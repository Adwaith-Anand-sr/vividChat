import axios from 'axios';
import Constants from "expo-constants";
import generateChatId from './generateChatId.js'
const dbUrl = Constants.expoConfig.extra.dbUrl;

const createChat = async participants => {
	const chatId = await generateChatId(participants);
	const chatData = {
		participants: participants.reduce((acc, userId) => {
			acc[userId] = true;
			return acc;
		}, {}),
		messages: {}
	};

	try {
		const response = await axios.put(
			`${dbUrl}/chats/${chatId}.json`,
			chatData
		);
		if (response.status === 200) {
			console.log("Chat created successfully");
			return chatId;
		} else {
			console.error("Error creating chat:", response.statusText);
		}
	} catch (error) {
		console.error("Error creating chat:", error);
	}
};

export default createChat;