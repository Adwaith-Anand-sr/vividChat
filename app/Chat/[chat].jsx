import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import TextArea from "../../components/TextArea.jsx";
import LottieView from "lottie-react-native";

const apiUrl = Constants.expoConfig.extra.apiUrl;
const dbUrl = Constants.expoConfig.extra.dbUrl;

import sendMessage from "../../utils/sendMessage.js";
import getChatMessages from "../../utils/getChatMessages.js";
import generateChatId from "../../utils/generateChatId.js";
import getAllUsers from "../../utils/getAllUsers.js";

const Chat = () => {
	const route = useRoute();
	const { chat } = route.params;
	const chatPartnerId = chat;
	const [userId, setUserId] = useState(null);
	const [chatPartner, setChatPartner] = useState(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const scrollViewRef = useRef(null);
	const messagesMap = useRef(new Map()); // Map to track messages by ID

	useEffect(() => {
		const fetchPartner = async () => {
			const users = await getAllUsers();
			const dets = users ? users[chatPartnerId] : null;
			setChatPartner(dets);
			const storedUserId = await AsyncStorage.getItem("userId");
			setUserId(storedUserId);
		};
		fetchPartner();
	}, []);

	useEffect(() => {
		if (userId && chatPartnerId) {
			const chatId = generateChatId([userId, chatPartnerId].sort());
			const fetchMessages = async () => {
				const fetchedMessages = await getChatMessages(chatId);
				if (fetchedMessages) {
					const messagesArray = Object.keys(fetchedMessages).map(key => ({
						...fetchedMessages[key],
						id: key // Assuming each message has a unique key in the fetched data
					}));

					setMessages(prevMessages => {
						messagesArray.forEach(msg => {
							if (!messagesMap.current.has(msg.id)) {
								messagesMap.current.set(msg.id, msg);
							}
						});

						const uniqueMessages = Array.from(
							messagesMap.current.values()
						);
						return uniqueMessages;
					});
				}
			};
			fetchMessages();
			if (userId !== chatPartnerId) {
				const intervalId = setInterval(fetchMessages, 1000);
				return () => clearInterval(intervalId);
			}
		}
	}, [userId, chatPartnerId]);

	const handleSendMessage = async () => {
		if (message.trim() === "") return;
		const msg = message ;
		setMessage("");
		try {
			const userId = await AsyncStorage.getItem("userId");
			if (userId) {
				const participants = {
					sender: userId,
					receiver: chatPartnerId
				};
				await sendMessage(participants, msg);
			} else {
				console.error("User ID is not available.");
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const handleScrollToEnd = () => {
		scrollViewRef.current.scrollToEnd({ animated: true });
	};
	const name = null;
	const formatTime = timestamp => {
		const date = new Date(timestamp);
		let hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		hours = hours.toString().padStart(2, "0");
		return `${hours}:${minutes} ${ampm}`;
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<StatusBar style="light" backgroundColor="black" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
				<View style={{ flex: 1 }}>
					<View className="flex-row bg-neutral-900 px-3 items-center h-[8vh]">
						<TouchableOpacity onPress={() => router.back()}>
							<AntDesign name="left" color="white" size={20} />
						</TouchableOpacity>
						<View className="w-[4.5vh] h-[4.5vh] ml-5 mr-3 rounded-full overflow-hidden">
							<Image
								style={{ width: "100%", height: "100%" }}
								source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
								contentFit="cover"
							/>
						</View>
						{chatPartner?.username ? (
							<Text className="text-white text-2xl font-black tracking-tighter">
								{chatPartner.username}
							</Text>
						) : (
							<View className="flex -ml-4 justify-center h-full">
								<LottieView
									source={require("../../assets/animations/usernameLoadAnim.json")}
									autoPlay
									style={{
									   width: 120,
									   height: 120,
									}}
									loop
								/>
							</View>
						)}
					</View>
					<ScrollView
						style={{ flex: 1 }}
						contentContainerStyle={{ padding: 10 }}
						ref={scrollViewRef}
						onContentSizeChange={handleScrollToEnd}>
						<View>
							{messages.map(item => (
								<View key={item.id} className="py-2">
									<View
										style={[
											{
												alignSelf:
													item.sender === userId
														? "flex-end"
														: "flex-start"
											}
										]}
										className="relative bg-zinc-900 py-1 max-w-[85%] min-w-[25%] px-4 pb-5 rounded-lg w-auto flex">
										<Text 
											className="text-white font-normal text-[3.85vw]">
											{item.message}
										</Text>
										<Text
											className="absolute right-0 mr-2 text-white font-semibold text-[2.5vw] bottom-1 text-zinc-500">
											{formatTime(item.timestamp)}
										</Text>
									</View>
								</View>
							))}
						</View>
					</ScrollView>
				</View>
				<View className="justify-between px-1 flex-row items-center h-[7vh]">
					<TextArea message={message} setMessage={setMessage} />
					<TouchableOpacity onPress={handleSendMessage}>
						<View className="mr-1 h-[5vh] w-[5vh] bg-green-500 rounded-full flex justify-center items-center ">
							<AntDesign name="right" color="white" size={22} />
						</View>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Chat;
