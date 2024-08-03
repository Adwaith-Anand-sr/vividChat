import axios from 'axios';
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;

const findChat = async participants => {
	try {
		const response = await axios.get(`${dbUrl}/chats.json`);
		if (response.status === 200) {
			const chats = response.data;
			const chatId = Object.keys(chats).find(id => {
				const chatParticipants = Object.keys(chats[id].participants);
				return participants.every(participant =>
					chatParticipants.includes(participant)
				);
			});
			if (chatId) {
				console.log(`Chat found: ${chatId}`);
				return chatId;
			} else {
				console.log("No chat found with the specified participants");
				return null;
			}
		} else {
			console.error("Error fetching chats:", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("Error fetching chats:", error);
		return null;
	}
};

export default findChat;