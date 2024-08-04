import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const getAllUsers = async () => {
	try {
		const user = await AsyncStorage.getItem("userId");
		const token = await AsyncStorage.getItem("idToken");
		if (!token) router.push("Auth");

		const response = await axios.get(`${dbUrl}/users.json?auth=${token}`);
		if (response.status === 200) {
			const allUsers = response.data;
			if(!allUsers) return []
			const filteredUsers = Object.keys(allUsers)
				.filter(userId => userId !== user)
				.reduce((obj, key) => {
					obj[key] = allUsers[key];
					return obj;
				}, {});
			return filteredUsers;
		} else {
			console.error("Error fetching users:", response.statusText);
			return [];
		}
	} catch (error) {
		console.error("Error fetching users:", error);
		return [];
	}
};

export default getAllUsers;
