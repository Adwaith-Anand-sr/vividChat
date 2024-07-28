import React, { useEffect, useState } from "react";
import { Add, Notifications } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_SERVER_URL;
import avatar from "../assets/images/avatar.jpg";

import Search from "../components/Search.jsx";

const AllUsers = () => {
	const navigate = useNavigate();

	const [allUsers, setAllUsers] = useState([]);

	const handleOpenChat = id => {
		navigate(`/chat/${id}`)
	};

	useEffect(() => {
		axios
			.get(`${backendURL}/getAllUsers`)
			.then(response => {
				setAllUsers(response.data.users);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Search />
			<div className="w-full bg-zinc-950 text-white min-h-[90vh] flex flex-col overflow-x-hidden overflow-y-auto">
				{allUsers.map(user => (
					<div
						key={user._id}
						onClick={() => handleOpenChat(user._id)}
						className="w-full px-[2vw] h-[8vh] flex items-center gap-4 text-white overflow-hidden">
						<img
							src={avatar}
							className="w-[5.5vh] h-[5.5vh] rounded-full border"
						/>
						<h1 className="text-[1rem] font-black">{user.username}</h1>
					</div>
				))}
			</div>
		</>
	);
};

export default AllUsers;
