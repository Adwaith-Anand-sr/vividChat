import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Pressable,
	StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
const dbUrl = Constants.expoConfig.extra.dbUrl;

import handleSignup from "../utils/authentication/handleSignup.js";
import handleLogin from "../utils/authentication/handleLogin.js";
import isTokenExpired from "../utils/authentication/isTokenExpired.js";
import checkUsernameExists from "../utils/authentication/checkUsernameExists.js";

const Auth = () => {
	const [isNewUser, setIsNewUser] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [statusMessage, setStatusMessage] = useState(null);
	const passwordInputRef = useRef(null);
	const userNameInputRef = useRef(null);
	const apiUrl = Constants.expoConfig.extra.apiUrl;

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

	const handleLoginSubmit = async e => {
		e.preventDefault();
		setStatusMessage(<Text className="text-yellow-500">please wait..</Text>);
		if (!email.trim() || !password.trim()) {
			setStatusMessage(
				<Text className="text-red-500">All fields are required!</Text>
			);
			return;
		}
		const res = await handleLogin(email, password);
		if (res === true) {
			setStatusMessage(
				<Text className="text-green-500">User signed in successfully.</Text>
			);
			router.replace("(home)");
		} else if (res === "INVALID_LOGIN_CREDENTIALS")
			setStatusMessage(
				<Text className="text-red-500">Invalid email or password!</Text>
			);
		else setStatusMessage(<Text className="text-red-500">{res}</Text>);
	};
	const handleSignupSubmit = async e => {
		e.preventDefault();
		setStatusMessage(<Text className="text-yellow-500">please wait..</Text>);
		if (!username.trim() || !email.trim() || !password.trim()) {
			setStatusMessage(
				<Text className="text-red-500">All fields are required!</Text>
			);
			return;
		}
		if (await checkUsernameExists(username)) {
			setStatusMessage(
				<Text className="text-red-500">Username already exists!</Text>
			);
			return;
		}
		const res = await handleSignup(username, email, password);
		if (res === true) {
			setStatusMessage(
				<Text className="text-green-500">User signed up successfully!</Text>
			);
			router.replace("(home)");
		} else if (res === "EMAIL_EXISTS")
			setStatusMessage(
				<Text className="text-red-500">email already exists!</Text>
			);
		else setStatusMessage(<Text className="text-red-500">{res}</Text>);
	};

	return (
		<>
			<SafeAreaView>
				<StatusBar
					barStyle="light-content"
					backgroundColor="rgb(24, 24, 27)"
				/>
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
							value={email}
							onChangeText={handleEmailChange}
							inputMode="email"
							keyboardType="email-address"
							placeholder="email"
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
							onSubmitEditing={handleLoginSubmit}
							value={password}
							onChangeText={handlePasswordChange}
							placeholder="password"
							className="text-white tracking-tighter text-[4vw] border border-white mt-5 pl-4 w-[80%] h-[6.5vh] rounded-lg"
						/>
						<Text className="text-white pt-3">{statusMessage}</Text>

						<TouchableOpacity
							onPress={handleLoginSubmit}
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
									setStatusMessage("");
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
							value={email}
							onChangeText={handleEmailChange}
							inputMode="email"
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
							onSubmitEditing={handleSignupSubmit}
							value={password}
							onChangeText={handlePasswordChange}
							placeholder="password"
							className="text-white tracking-tighter text-[4vw] border border-white mt-5 pl-4 w-[80%] h-[6.5vh] rounded-lg"
						/>
						<Text className="text-white pt-3">{statusMessage}</Text>
						<TouchableOpacity
							onPress={handleSignupSubmit}
							className="w-[58%] rounded-lg flex items-center py-[0.8vh] mt-6 bg-green-400">
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
									setStatusMessage("");
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
