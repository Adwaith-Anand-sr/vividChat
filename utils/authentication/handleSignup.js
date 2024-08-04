import React, { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiKey = Constants.expoConfig.extra.apiKey;
const dbUrl = Constants.expoConfig.extra.dbUrl;

const handleSignup = async (username, email, password) => {
	try {
		const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
		const authResponse = await axios.post(authUrl, {
			email,
			password,
			returnSecureToken: true
		});
		const { idToken, refreshToken, localId } = authResponse.data;
		await AsyncStorage.setItem("idToken", idToken);
		await AsyncStorage.setItem("refreshToken", refreshToken);

		await axios.post(`${dbUrl}/users.json?auth=${idToken}`, {
			username,
			email
		});
		
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
		console.log(error);
		if (error.response && error.response.data && error.response.data.error) {
			const { message } = error.response.data.error;
			return message;
		}
	}
};

export default handleSignup;
