import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dbUrl = Constants.expoConfig.extra.dbUrl;

const getChatMessages = async chatId => {
	try {
		// Retrieve the authentication token
		const token = await AsyncStorage.getItem('idToken');
		if (!token) {
			throw new Error("Authentication token is missing.");
		}

		// Make the API request to get chat messages
		const response = await axios.get(
			`${dbUrl}/chats/${chatId}/messages.json?auth=${token}`
		);

		// Check if response data is null or undefined
		if (response.data === null) {
			return {}; // Return an empty object if no messages are found
		}

		return response.data; // Return the messages data

	} catch (error) {
		console.error("Error fetching chat messages:", error);
		return {}; // Return an empty object on error
	}
};

export default getChatMessages;
