import React, { useRef, useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	ScrollView,
	StatusBar,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TextArea from "../../components/TextArea.jsx";
import Constants from "expo-constants";
const apiUrl = Constants.expoConfig.extra.apiUrl;
const socketUrl = Constants.expoConfig.extra.socketUrl;
const dbUrl = Constants.expoConfig.extra.dbUrl;
const apiKey = Constants.expoConfig.extra.firebaseApiKey;

import io from "socket.io-client";

const socket = io(`${socketUrl}`);
const Chat = () => {
	const route = useRoute();
	const { chat } = route.params;
	const chatPartnerId = chat;
	const [chatPartner, setChatPartner] = useState(null);

	const [message, setMessage] = useState("");
	const [numberOfLines, setNumberOfLines] = useState(3);
	const scrollViewRef = useRef(null);
	const msg = [
		1, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36,
		36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 0
	];

	useEffect(() => {
		const fetchPartner = async () => {
			try {
				const res = await axios.post(`${apiUrl}/getUser`, {
					chatPartnerId
				});
				if (res.data.success) setChatPartner(res.data.user);
				else alert("error fetching user!");
			} catch (err) {
				console.log("fetchPartner error: ", err);
			}
		};
		fetchPartner();
	}, []); //fetch partner;

	useEffect(() => {
		const handleConnect = () => {
			alert("Connected to server");
		};

		const handleRecieveMessage = dets => {
			console.log(dets);
			alert("recieve message");
		};

		socket.on("connect", handleConnect);
		socket.on("receiveMessage", handleRecieveMessage);
		return () => {
			socket.off("connect", handleConnect);
			socket.off("receiveMessage", handleRecieveMessage);
		};
	}, [socket]);


	const handleSendMessage = async () => {
		const userId = await AsyncStorage.getItem("userId");
		const dets = {
			senderId: userId,
			receiverId: chatPartner._id,
			message
		};
		setMessage(null);
		socket.emit("sendMessage", dets, response => {
			if (response.status === "ok") {
				console.log("Message sent successfully:", response.data);
			} else {
				console.error("Error sending message:", response);
			}
		});
	};

	const handleMessageChange = msg => {
		setMessage(msg);
	};

	const handleContentSizeChange = e => {
		const contentHeight = e.nativeEvent.contentSize.height;
		console.log(e.nativeEvent.contentSize);
		const lineHeight = 24; // adjust according to your font size
		const maxLines = 4;
		const newNumberOfLines = Math.max(
			Math.ceil(contentHeight / lineHeight),
			maxLines
		);
		setNumberOfLines(newNumberOfLines);
	};

	const handleScrollToEnd = () => {
		scrollViewRef.current.scrollToEnd({ animated: true });
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
						<Text className="text-white text-2xl font-black tracking-tighter">
							{chatPartner?.username}
						</Text>
					</View>
					<ScrollView
						style={{ flex: 1 }}
						contentContainerStyle={{ padding: 10 }}
						ref={scrollViewRef}
						onContentSizeChange={handleScrollToEnd}>
						<View>
							{msg.map((item, i) => (
								<View key={i} className="h-[5vh] w-full">
									<Text className="text-white text-3xl">{item}</Text>
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
