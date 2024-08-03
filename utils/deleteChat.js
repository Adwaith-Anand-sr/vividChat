import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;

const deleteChat = async chatId => {
	try {
		await axios.delete(`${dbUrl}/chats/${chatId}.json`);
		console.log("Chat deleted successfully");
	} catch (error) {
		console.error("Error deleting chat:", error);
	}
};

// Example usage
// const chatId = "yourChatIdHere";
// deleteChat(chatId);

export default deleteChat;