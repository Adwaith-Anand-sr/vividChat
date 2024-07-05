import React, { useState, useEffect } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Send as SendIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

function ChatBar() {
	const [message, setMessage] = useState("");

	const handleChange = event => {
		setMessage(event.target.value);
	};

	const handleSendMessage = () => {
		socket.emit('sendMessage', message)
	};

	return (
		<div className="w-full min-h-[8vh] flex items-center justify-between">
			<TextareaAutosize
				style={{
					borderRadius: "15px",
					width: "85%",
					marginLeft: "1vw",
					padding: "1.35vh 4vw",
					outline: "none"
				}}
				className="bg-zinc-700"
				maxRows={4}
				aria-label="maximum height"
				placeholder="message"
				onChange={handleChange}
			/>
			<SendIcon
				className="bg-green-500"
				onClick={() => handleSendMessage()}
				style={{
					borderRadius: "50%",
					padding: "1vh",
					fontSize: "3rem",
					marginRight: "1vw"
				}}
			/>
		</div>
	);
}

export default ChatBar;
