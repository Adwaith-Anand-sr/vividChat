import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { FontAwesome, Ionicons, FontAwesome6 } from "@expo/vector-icons";


export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarInactiveTintColor: 'rgb(210,215,210)',
				tabBarActiveTintColor: 'white',
				tabBarStyle: {
					backgroundColor: "black",
					height: 65
				}
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Chats",
					tabBarIcon: ({ color }) => (
						<View className="flex justify-center items-center gap-1">
							<FontAwesome6 size={22} name="comment" color={color} />
							<Text style={{color}} >{'Chats'}</Text>
						</View>
					)
				}}
			/>
			<Tabs.Screen
				name="Updates"
				options={{
					title: "Updates",
					tabBarIcon: ({ color }) => (
						<View className="flex items-center justify-center gap-1">
							<Ionicons
								size={22}
								name="sparkles-outline"
								color={color}
							/>
							<Text style={{color}} >{'Updates'}</Text>
						</View>
					)
				}}
			/>
			<Tabs.Screen
				name="Global"
				options={{
					title: "Global",
					tabBarIcon: ({ color }) => (
						<View className="flex items-center justify-center gap-1">
							<FontAwesome6 name="users" size={22} color={color} />
							<Text style={{color}} >{'Global'}</Text>
						</View>
					)
				}}
			/>
		</Tabs>
	);
}
