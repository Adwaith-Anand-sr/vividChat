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

const Chats = () => {
	const [recentUsers, setRecentUsers] = useState(null);
	useEffect(() => {
		const fetchRecentUsers = async () => {
			try {
				const userId = await AsyncStorage.getItem("userId");
				const res = await axios.post(`${apiUrl}/getRecentUsers`, {
					userId
				});
				if (res.data.success) setRecentUsers(res.data.users);
				else alert("error fetching user!");
			} catch (err) {
				console.log("fetchPartner error: ", err);
			}
		};
		fetchRecentUsers();
	}, []);

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
				<StatusBar
					barStyle="light-content"
					backgroundColor="rgb(24, 24, 27)"
				/>
				<View className="bg-zinc-950 h-full">
					<View className="bg-zinc-950 my-5 ml-3">
						<Text className="text-3xl text-white font-black tracking-tighter">
							vividChat
						</Text>
					</View>
					<ScrollView
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingBottom: 20 }}>
						<View className="bg-zinc-950">
							{recentUsers?.length >0 ? (
								<>
									{recentUsers.map((user, i) => (
									   <TouchableOpacity key={user._id} onPress={()=> router.push(`Chat/${user._id}`)}>
										<View
											key={user._id}
											className="bg-zinc-950 flex-row items-center h-[8.5vh]">
											<View className="w-[5vh] h-[5vh] mx-3 rounded-full overflow-hidden">
												<Image
													style={{ width: "100%", height: "100%" }}
													source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
													contentFit="cover"
												/>
											</View>
											<View className="flex justify-start gap-1">
												<Text className="text-white font-black text-[4.85vw] tracking-tighter">
													{user.username}
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
								<Text className='text-white pl-5'>you haven no recent users yet.</Text>
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
