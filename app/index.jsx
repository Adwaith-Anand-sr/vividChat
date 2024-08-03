import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import isTokenExpired from '../utils/authentication/isTokenExpired.js'

const Index = () => {
	const [isNewUser, setIsNewUser] = useState(false);

	useEffect(() => {
		const checkToken = async () => {
			try {
				const storedToken = await AsyncStorage.getItem("idToken");
				if (storedToken && !isTokenExpired(storedToken)) {
					router.replace("(home)");
				} else {
					router.replace("Auth");
				}
			} catch (e) {
				console.error("Failed to fetch token from storage", e);
			}
		};
		checkToken()
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
