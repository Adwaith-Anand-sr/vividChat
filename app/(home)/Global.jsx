import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Global = () => {
	return (
		<SafeAreaView>
			<StatusBar
				barStyle="light-content"
				backgroundColor="rgb(24, 24, 27)"
			/>
			<View className="h-full bg-zinc-950 flex justify-center items-center">
				<Text className="text-white">Global.</Text>
			</View>
		</SafeAreaView>
	);
};

export default Global;
