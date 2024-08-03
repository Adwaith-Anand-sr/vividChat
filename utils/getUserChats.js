import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserChats = async userId => {
	try {
		const token = await AsyncStorage.getItem("idToken");
		if (token) {
			const response = await axios.get(`${dbUrl}/chats.json?auth=${token}`);
			if (response.status === 200) {
				const chats = response.data;
				if (chats) {
					const userChats = Object.entries(chats);
					if (userChats.length > 0) {
						return userChats;
					} else {
						return [];
					}
				} else return [];
			} else {
				console.error("Error fetching chats:", response.statusText);
				return [];
			}
		}
	} catch (error) {
		console.error("Error fetching chats:", error);
		return [];
	}
};

export default getUserChats;
