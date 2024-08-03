import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	StatusBar,
	TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
const apiUrl = Constants.expoConfig.extra.apiUrl;
const dbUrl = Constants.expoConfig.extra.dbUrl;

import deleteChat from "../../utils/deleteChat.js";
import getUserChats from "../../utils/getUserChats.js";
import findUser from "../../utils/findUser.js";

const Chats = () => {
	const [chats, setChats] = useState([]);
   const [user, setUser] = useState(null) //username
	useEffect(() => {
		const fetchChats = async () => {
			try {
			   setUser(await AsyncStorage.getItem('userId'));
				let userId = await AsyncStorage.getItem("userId");
				let token = await AsyncStorage.getItem("idToken");
				if (userId && token) {
					let chats = await getUserChats(userId);
					setChats(chats);
				}
			} catch (error) {
				console.error("Error fetching chat messages:", error);
				return null;
			}
		};
		fetchChats();
		const intervalId = setInterval(fetchChats, 1000);
	   return () => clearInterval(intervalId);

	}, []);

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
				<StatusBar
					barStyle="light-content"
					backgroundColor="rgb(24, 24, 27)"
				/>
				<View className="h-full bg-zinc-950 ">
					<View className="bg-zinc-950 my-5 ml-3">
						<Text className="text-3xl text-white font-black tracking-tighter">
							vividChat
						</Text>
					</View>
					<ScrollView
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingBottom: 20 }}>
						<View className="bg-zinc-950">
							{chats?.length > 0 ? (
								<>
									{chats.map((item, i) => (
										<TouchableOpacity
											key={( item[1].users.user1.userId === user ) ? item[1].users.user2.userId : item[1].users.user1.userId}
											onPress={() =>
												router.push(`Chat/${( item[1].users.user1.userId === user ) ? item[1].users.user2.userId : item[1].users.user1.userId}`)
											}>
											<View
												key={( item[1].users.user1.userId === user ) ? item[1].users.user2.userId : item[1].users.user1.userId}
												className="bg-zinc-950 flex-row items-center h-[8.5vh]">
												<View className="w-[5vh] h-[5vh] mx-3 rounded-full overflow-hidden">
													<Image
														style={{
															width: "100%",
															height: "100%"
														}}
														source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
														contentFit="cover"
													/>
												</View>
												<View className="flex justify-start gap-1">
													<Text className="text-white font-black text-[4.85vw] tracking-tighter">
														{( item[1].users.user1.userId === user ) ? item[1].users.user2.username : item[1].users.user1.username}
													</Text>
													<Text className="text-zinc-300 text-[3vw]">
														last Message received/sent displays
														here...
													</Text>
												</View>
											</View>
										</TouchableOpacity>
									))}
								</>
							) : (
								<>
									<View className="flex justify-center items-center h-[60vh]">
										<Text className="text-zinc-300">
											you haven no chats yet.
										</Text>
									</View>
								</>
							)}
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>

			<TouchableOpacity
				onPress={() => {
					router.push("Others/AllUsers");
				}}
				className="flex justify-center items-center w-[5.5vh] h-[5.3vh] bg-green-500 absolute left-[80%] top-[90%] z-10 rounded-lg">
				<View className="flex justify-center items-center ">
					<MaterialCommunityIcons size={24} name="comment-plus" />
				</View>
			</TouchableOpacity>
		</>
	);
};

export default Chats;
