import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	StatusBar,
	TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

import getAllUsers from "../../utils/getAllUsers.js";

const AllUsers = () => {
	const [allUsers, setAllUsers] = useState([]);
	useEffect(() => {
		const fetchAllUsers = async () => {
			const users = await getAllUsers();
			const usersArray = Object.entries(users).map(([id, dets]) => ({
				id,
				...dets
			}));
			if (usersArray && usersArray.length > 0) setAllUsers(usersArray);
		};
		fetchAllUsers();
	}, []);

	const handleOpenChat = id => {
		try {
			router.replace(`Chat/${id}`);
		} catch (e) {
			console.log("fetch chat error: ", e);
		}
	};

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<StatusBar style="light" backgroundColor="black" />
			<View className="h-full bg-zinc-950 ">
				<View className="bg-zinc-950">
					<Text className="text-white text-2xl my-3 mx-3">AllUsers</Text>
				</View>

				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingBottom: 20 }}>
					<View className="bg-zinc-950">
						{allUsers.map((user, i) => (
							<TouchableOpacity
								key={user.id}
								onPress={() => handleOpenChat(user.id)}>
								<View
									key={user.id}
									className="bg-zinc-950 flex-row items-center h-[8.5vh]">
									<View className="w-[5vh] h-[5vh] mx-3 rounded-full overflow-hidden">
										<Image
											style={{ width: "100%", height: "100%" }}
											source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
											contentFit="cover"
										/>
									</View>
									<View className="flex w-full flex-row items-center">
										<Text className="text-white font-black text-[4.85vw] tracking-tighter">
											{user.username}
										</Text>
										<View className="flex absolute left-[70%] flex-row gap-2">
											<AntDesign
												name="message1"
												size={20}
												color="white"
											/>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default AllUsers;
