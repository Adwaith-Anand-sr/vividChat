import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
const findUser = async userId => {
	try {
		const token = await AsyncStorage.getItem("idToken");
		if(!token) router.push('Auth');
		const response = await axios.get(
			`${dbUrl}/users/${userId}.json?auth=${token}`
		);
		if(response.data) return Object.entries(response.data);
		else return null;
	} catch (error) {
		console.error(`Error fetching user details for user ${userId}:`, error);
		return null;
	}
};

export default findUser;
