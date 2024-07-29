import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;

const Auth = () => {
	const [isNewUser, setIsNewUser] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const passwordInputRef = useRef(null);
	const userNameInputRef = useRef(null);
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	const apiKey = Constants.expoConfig.extra.firebaseApiKey;
	const handleUsernameChange = text => {
		const formattedText = text.toLowerCase().replace(/\s+/g, "");
		setUsername(formattedText);
	};
	const handlePasswordChange = pass => {
		setPassword(pass);
	};
	const handleEmailChange = email => {
		setEmail(email);
	};

	const handleLogin = async () => {
		try {
			const res = await axios.post(`${apiUrl}/signin`, {
				username,
				password
			});
			if (res.data.success) {
				await AsyncStorage.setItem("token", res.data.token);
				await AsyncStorage.setItem("userId", res.data.userId);
				router.replace("(home)");
			}
		} catch (e) {
			if (e.response) {
				console.log("login error details : ", e.response.data.message);
			}
			console.log("login error : ", e);
		}
	};

	const handleSignUp = async () => {
		try {
		   if(username.length < 5) return; //handle username conditions here.
			const res = await axios.post(`${apiUrl}/signup`, {
				username,
				password,
				email
			});
			if (res.data.success) {
				alert(res.data.data.userId);
				await AsyncStorage.setItem("token", res.data.data.token);
				await AsyncStorage.setItem("userId", res.data.data.userId);
				router.replace("(home)");
			}
		} catch (e) {
			if (e.response) {
				console.log("signup error details : ", e.response.data.message);
			}
			console.log("signup error : ", e);
		}
	};


	return (
		<>
			<SafeAreaView>
				{!isNewUser ? (
					<View className="h-full bg-zinc-900 py-36 flex flex-col items-center">
						<Text className="text-5xl text-white  tracking-tighter font-black">
							LogIn
						</Text>
						<TextInput
							allowFontScaling
							textContentType="username"
							autoCapitalize="none"
							cursorColor="white"
							blurOnSubmit={false}
							returnKeyType="next"
							placeholderTextColor="rgb(126,120,120)"
							onSubmitEditing={() => passwordInputRef.current.focus()}
							value={username}
							onChangeText={handleUsernameChange}
							placeholder="username"
							className="text-white tracking-tighter text-[4vw] border border-white mt-10 pl-4 w-[80%] h-[6.5vh] rounded-lg"
						/>

						<TextInput
							ref={passwordInputRef}
							placeholderTextColor="rgb(126,120,120)"
							textContentType="password"
							allowFontScaling
							autoCapitalize="none"
							cursorColor="white"
							returnKeyType="done"
							onSubmitEditing={handleLogin}
							value={password}
							onChangeText={handlePasswordChange}
							placeholder="password"
							className="text-white tracking-tighter text-[4vw] border border-white mt-5 pl-4 w-[80%] h-[6.5vh] rounded-lg"
						/>

						<TouchableOpacity
							onPress={handleLogin}
							className="w-[58%] rounded-lg flex items-center py-[0.8vh] mt-8 bg-green-400">
							<Text className="text-[6.5vw] font-black tracking-tighter ">
								LogIn
							</Text>
						</TouchableOpacity>

						<View className="flex-row font-extrabold mt-5 items-center justify-center">
							<Text className="text-white text-[3.85vw]">
								Don't have an account?
							</Text>
							<Pressable
								onPress={() => {
									setIsNewUser(true);
								}}>
								<Text className="text-white text-[3.85vw] tracking-tighter font-black ml-1">
									SignUp.
								</Text>
							</Pressable>
						</View>
					</View>
				) : (
					<View className="h-full py-36 bg-zinc-900 flex flex-col items-center">
						<Text className="text-white text-5xl tracking-tighter font-black">
							SignUp
						</Text>
						<TextInput
							allowFontScaling
							textContentType="emailAddress"
							autoCapitalize="none"
							cursorColor="white"
							blurOnSubmit={false}
							returnKeyType="next"
							placeholderTextColor="rgb(126,120,120)"
							onSubmitEditing={() => userNameInputRef.current.focus()}
							placeholder="email"
							inputMode="email"
							value={email}
							onChangeText={handleEmailChange}
							keyboardType="email-address"
							className="text-white tracking-tighter text-[4vw] border border-white mt-10 pl-4 w-[80%] h-[6.5vh] rounded-lg"
						/>

						<TextInput
							ref={userNameInputRef}
							allowFontScaling
							textContentType="username"
							autoCapitalize="none"
							cursorColor="white"
							blurOnSubmit={false}
							returnKeyType="next"
							placeholderTextColor="rgb(126,120,120)"
							onSubmitEditing={() => passwordInputRef.current.focus()}
							value={username}
							onChangeText={handleUsernameChange}
							placeholder="username"
							inputMode="text"
							className="text-white tracking-tighter text-[4vw] border border-white mt-5 pl-4 w-[80%] h-[6.5vh] rounded-lg"
						/>

						<TextInput
							ref={passwordInputRef}
							placeholderTextColor="rgb(126,120,120)"
							textContentType="password"
							allowFontScaling
							autoCapitalize="none"
							cursorColor="white"
							returnKeyType="done"
							onSubmitEditing={handleSignUp}
							value={password}
							onChangeText={handlePasswordChange}
							placeholder="password"
							className="text-white tracking-tighter text-[4vw] border border-white mt-5 pl-4 w-[80%] h-[6.5vh] rounded-lg"
						/>

						<TouchableOpacity
							onPress={handleSignUp}
							className="w-[58%] rounded-lg flex items-center py-[0.8vh] mt-8 bg-green-400">
							<Text className="text-[6.5vw] font-black tracking-tighter ">
								SignUp
							</Text>
						</TouchableOpacity>

						<View className="flex-row font-extrabold mt-5 items-center justify-center">
							<Text className="text-white text-[3.8vw]">
								Already have an account?
							</Text>
							<Pressable
								onPress={() => {
									setIsNewUser(false);
								}}>
								<Text className="text-white text-[3.8vw] tracking-tighter font-black ml-1">
									LogIn.
								</Text>
							</Pressable>
						</View>
					</View>
				)}
			</SafeAreaView>
		</>
	);
};

export default Auth;
