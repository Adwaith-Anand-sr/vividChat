import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";


const isTokenExpired = token => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		);
		const decoded = JSON.parse(jsonPayload);
		if (!decoded.exp) {
			console.error("Token does not have an 'exp' claim");
			return true;
		}
		const currentTime = Math.floor(Date.now() / 1000);
		return decoded.exp < currentTime;
	} catch (e) {
		console.error("Failed to decode token", e);
		return true;
	}
};

const Index = () => {
	const [isNewUser, setIsNewUser] = useState(false);
	const apiUrl = Constants.expoConfig.extra.apiUrl;

	useEffect(() => {
		const healthCheck = async () => {
			try {
				const res = await axios.get(`${apiUrl}/health`);
				if (res.data.status === "ok") checkToken();
			} catch (error) {
				console.error("Error fetching health data:", error); 
				alert("Error fetching server health!");
			}
		};
		healthCheck();

		const checkToken = async () => {
			try {
				const storedToken = await AsyncStorage.getItem("token");
				if (storedToken && !isTokenExpired(storedToken)) {
					router.replace("(home)");
				} else {
					router.replace("Auth");
				}
			} catch (e) {
				console.error("Failed to fetch token from storage", e);
			}
		};
	}, []);

	return (
		<SafeAreaView>
			<View className="flex justify-center h-full items-center">
				<Text className='text-green-500'>App.</Text>
			</View>
		</SafeAreaView>
	);
};

export default Index;
