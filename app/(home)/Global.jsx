import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Global = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="rgb(24, 24, 27)"
			/>
			<View style={styles.container}>
				<Text style={styles.text}>Global.</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "rgb(24, 24, 27)"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgb(24, 24, 27)"
	},
	text: {
		color: "white"
	}
});

export default Global;
