import React, { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiKey = Constants.expoConfig.extra.apiKey;
const dbUrl = Constants.expoConfig.extra.dbUrl;


const handleLogin = async (email, password) => {
	const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
	try {
		const response = await axios.post(authUrl, {
			email,
			password,
			returnSecureToken: true
		});

		const { idToken, refreshToken, localId } = response.data;
		await AsyncStorage.setItem("idToken", idToken);
		await AsyncStorage.setItem("refreshToken", refreshToken);
		const userResponse = await axios.get(
			`${dbUrl}/users.json?auth=${idToken}`
		);

		const usersArray = Object.entries(userResponse.data).map(
			([id, userInfo]) => ({
				id,
				...userInfo
			})
		);

		usersArray.map(async user => {
			if (user.email === email) {
				await AsyncStorage.setItem("userId", user.id);
				await AsyncStorage.setItem("username", user.username);
			}
		});
		return true;
	} catch (error) {
		if (error.response && error.response.data && error.response.data.error) {
			const { message } = error.response.data.error;
			return message;
		}
	}
};

export default handleLogin;
