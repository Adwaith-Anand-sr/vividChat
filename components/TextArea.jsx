import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const DynamicTextArea = ({message, setMessage}) => {
	const [height, setHeight] = useState(45);
	const [marginBottom, setMarginBottom] = useState(5);

	return (
		<View style={[styles.textAreaContainer, { marginBottom: marginBottom }]}>
			<TextInput
				style={[styles.textInput, { height: Math.max(45, height) }]}
				onChangeText={text => setText(text)}
				onChangeText={setMessage}
            value={message}
				placeholderTextColor="rgb(208,208,208)"
				multiline
				onContentSizeChange={event => {
					const newHeight = event.nativeEvent.contentSize.height;
					if (newHeight < 80) {
						setHeight(newHeight);
						setMarginBottom(5 + (newHeight - 40));
					}
				}}
				placeholder="Type your message..."
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	textAreaContainer: {
		flexDirection: "row",
		width: '86%'
	},
	textInput: {
		flex: 1,
		padding: 10,
		paddingLeft: 15,
		borderWidth: 1,
		backgroundColor: "#2c2c2c",
		lineHeight:25,
		borderRadius: 18,
		color: 'white',
		fontSize: 15
	}
});

export default DynamicTextArea;
