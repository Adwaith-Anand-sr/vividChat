import { v4 as uuidv4 } from "uuid";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;

export const generateGroupChatId = participants => {
	const sortedParticipants = [...participants].sort();
	const groupId = uuidv4();
	return `${groupId}_${sortedParticipants.join("_")}`;
};

export const createChat = async (chatId, participants) => {
	try {
		await dbUrl.ref(`chats/${chatId}`).set({
			participants: participants.reduce((acc, userId) => {
				acc[userId] = true;
				return acc;
			}, {}),
			messages: {}
		});
		console.log("Chat created successfully");
	} catch (error) {
		console.error("Error creating chat:", error);
	}
};
