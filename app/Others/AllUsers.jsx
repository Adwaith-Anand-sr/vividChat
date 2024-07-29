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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
const apiUrl = Constants.expoConfig.extra.apiUrl;
import { router } from "expo-router";

const AllUsers = () => {
	const [allUsers, setAllUsers] = useState();

	const fetchAllUsers = async () => {
		try {
			const res = await axios.get(`${apiUrl}/getAllUsers`);
			if (res.data.success && res.data.users) setAllUsers(res.data.users);
		} catch (e) {
			console.log("fetch users error: ", e);
		}
	};
	fetchAllUsers();
	
	const handleOpenChat = (id) => {
		try {
		   router.replace(`Chat/${id}`)
		} catch (e) {
			console.log("fetch users error: ", e);
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
						{allUsers?.map((user, i) => (
							<TouchableOpacity key={user._id} onPress={()=> handleOpenChat(user._id) }>
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
