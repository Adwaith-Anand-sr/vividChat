import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowBack, Send as SendIcon } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Button, Paper, Typography } from "@mui/material";

const backendURL = import.meta.env.VITE_SERVER_URL;
import avatar from "../assets/images/avatar.jpg";

import getSocket from "../utils/socket.js";
import ChatBar from "../components/ChatBar.jsx";

const Chat = () => {
	const { id } = useParams();
	const socket = getSocket();

	const [user, setUser] = useState([]);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const chatContainerRef = useRef(null);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleChange = event => {
		setMessage(event.target.value);
	};

	const handleBack = () => {
		window.history.back();
	};

	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	};
	scrollToBottom();

	const getTime = timestamp => {
		const date = new Date(timestamp);
		const hours = date.getHours();
		let h;
		if (hours > 12) h = hours - 12;
		// hours = hours % 12 || 12;
		const minutes = date.getMinutes();
		return (
			<div className="text-right ml-[1vw] text-[0.55rem]">
				{h}:{minutes}
			</div>
		);
	};
	const getStatus = isreaded => {
		return (
			<div className="text-right ml-[5vh] text-[0.55rem]">
				{isreaded ? <>seened</> : null}
			</div>
		);
	};

	const addReceivedMessage = newMessage => {
		setMessages(prevMessages => [...prevMessages, newMessage]);
		scrollToBottom();
		socket.emit("seenMessage", newMessage);
	};
	const addSendedMessage = newMessage => {
		setMessages([...messages, newMessage]);
		scrollToBottom();
	};
	const updateSeenMessage = seenMessage => {
		setMessages(prevMessages =>
			prevMessages.map(message =>
				message._id === seenMessage._id
					? { ...message, isreaded: true }
					: message
			)
		);
	};

	const handleSendMessage = () => {
		if (message.trim() === "") return;
		let sender = Cookies.get("userId");
		let receiver = user._id;
		socket.emit("sendMessage", { sender, receiver, message });
		setMessage("");
		socket.on("sendMessage", chat => {
			addSendedMessage(chat);
		});
	};

	useEffect(() => {
		socket.emit("join", Cookies.get("userId"));
		socket.emit("seenAllMessages", {userId: Cookies.get('userId'), oppId: id});
		socket.on("receiveMessage", chat => {
			addReceivedMessage(chat);
		});
		socket.on("seenMessage", chat => {
			updateSeenMessage(chat);
		});
      
		return () => {
			socket.off("join");
			socket.off("receiveMessage");
			socket.off("seenMessage");
			socket.off("seenAllMessages");
		};
	}, []);

	useEffect(() => {
		axios
			.post(`${backendURL}/getUser`, { userId: id })
			.then(response => {
				setUser(response.data.user);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios
			.post(`${backendURL}/getMassages`, {
				oppId: id,
				userId: Cookies.get("userId")
			})
			.then(response => {
				setMessages(response.data.messages);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<div
			style={{ height: "100%" }}
			className="flex flex-col bg-zinc-900 text-white overflow-hidden">
			<nav className="w-full flex gap-3 pl-3 py-3 h-[7vh] items-center">
				<ArrowBack onClick={() => handleBack()} />
				<img
					src={avatar}
					className="w-[2.85rem] h-[h-2.85rem] rounded-full"
				/>
				<h1>{user.username}</h1>
			</nav>

			<main
				className="flex-grow overflow-x-hidden flex gap-0 flex-col overflow-auto bg-zinc-950"
				ref={chatContainerRef}>
				{messages.map((item, index) => (
					<>
						{item.sender.toString() === id.toString() ? (
							<>
								<Typography
									style={{
										margin: "1vh 2vw",
										padding: "1vh 2vw 0.5vh 5vw",
										maxWidth: "80%"
									}}
									className="w-fit break-words select-none bg-zinc-900 rounded-lg">
									{item.message}
									{getTime(item.timestamp)}
								</Typography>
							</>
						) : (
							<>
								<Typography
									style={{
										margin: "1vh 2vw",
										alignSelf: "flex-end",
										padding: "1vh 2vw 0.5vh 5vw",
										maxWidth: "80%"
									}}
									className="w-fit break-words select-none bg-zinc-900 rounded-lg">
									{item.message}
									<div className="flex">
										{getStatus(item.isreaded)}
										{getTime(item.timestamp)}
									</div>
								</Typography>
							</>
						)}
					</>
				))}
			</main>

			<div className="w-full min-h-[8vh] flex items-center justify-between">
				<TextareaAutosize
					style={{
						borderRadius: "15px",
						width: "85%",
						marginLeft: "2vw",
						padding: "1.35vh 4vw",
						outline: "none"
					}}
					className="bg-zinc-700"
					maxRows={3}
					aria-label="maximum height"
					placeholder="message"
					onChange={handleChange}
					value={message}
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
		</div>
	);
};

export default Chat;
