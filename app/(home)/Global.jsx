import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import socket from "../../config/socket.js";

const Global = () => {
   const [first, setfirst] = useState(null)
	useEffect(() => {
		socket.on("connect", () => {
			alert("Connected to server");
			
			setfirst(' connected')
		});

		return () => {
			socket.off("connect");
		};
	}, []);

	return (
		<SafeAreaView>
			<View>
				<Text>Global.{first}</Text>
			</View>
		</SafeAreaView>
	);
};

export default Global;
