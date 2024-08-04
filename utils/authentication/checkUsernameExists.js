import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const dbUrl = Constants.expoConfig.extra.dbUrl;

const checkUsernameExists = async username => {
	try {
		const token = await AsyncStorage.getItem("idToken");
		const response = await axios.get(`${dbUrl}/users.json`);
		if (response.status === 200) {
			const users = response.data;
			if (users) {
				const userExists = Object.keys(users).some(
					userId => users[userId].username === username
				);
				return userExists;
			} else {
				return false;
			}
		} else {
			console.error("Error fetching users:", response.statusText);
			return false;
		}
	} catch (error) {
		console.error("Error fetching users:", error);
		return false;
	}
};

export default checkUsernameExists;
