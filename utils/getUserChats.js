import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const getUserChats = async userId => {
	try {
		const token = await AsyncStorage.getItem("idToken");
		if (token) {
			const response = await axios.get(`${dbUrl}/chats.json?auth=${token}`);
			if (response.status === 200) {
				const chats = response.data;
				if (chats) {
					const userChats = Object.entries(chats).filter(([chatId, chatData]) => {
						if (chatData.users && typeof chatData.users === 'object') {
							return Object.values(chatData.users).some(user => user.userId === userId);
						}
						return false;
					});
					return userChats.length > 0 ? userChats : [];
				} else {
					return [];
				}
			} else {
				console.error("Error fetching chats:", response.statusText);
				return [];
			}
		} else {
			router.push("Auth");
		}
	} catch (error) {
		console.error("Error fetching chats:", error);
		return [];
	}
};

export default getUserChats;
