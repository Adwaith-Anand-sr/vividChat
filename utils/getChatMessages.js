import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
const dbUrl = Constants.expoConfig.extra.dbUrl;

const getChatMessages = async chatId => {
	try {
		const token = await AsyncStorage.getItem("idToken");
		if (!token) {
			throw new Error("Authentication token is missing.");
			router.push("Auth");
		}

		const response = await axios.get(
			`${dbUrl}/chats/${chatId}/messages.json?auth=${token}`
		);
		if (response.data === null) {
			return {}; 
		}
		return response.data; 
	} catch (error) {
		console.error("Error fetching chat messages:", error);
		return {}; 
	}
};

export default getChatMessages;
