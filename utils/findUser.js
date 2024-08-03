import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;
import AsyncStorage from "@react-native-async-storage/async-storage";

const findUser = async userId => {
	try {
		const token = await AsyncStorage.getItem("idToken");
		const response = await axios.get(
			`${dbUrl}/users/${userId}.json?auth=${token}`
		);
		return Object.entries(response.data);
	} catch (error) {
		console.error(`Error fetching user details for user ${userId}:`, error);
		return null;
	}
};

export default findUser;
