import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllUsers = async () => {
	try {
	   const token = await AsyncStorage.getItem('idToken')
		const response = await axios.get(`${dbUrl}/users.json?auth=${token}`);
		if (response.status === 200) {
			return response.data; //users object.
		} else {
			console.error("Error fetching chats:", response.statusText);
			return [];
		}
	} catch (error) {
		console.error("Error fetching chats:", error);
		return [];
	}
};

export default getAllUsers;
