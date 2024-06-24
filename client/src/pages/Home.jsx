import React, { useEffect, useState } from "react";
import { Add, Notifications } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const backendURL = import.meta.env.VITE_SERVER_URL;
import avatar from "../assets/images/avatar.jpg";
import HomeNav from "../components/HomeNav.jsx";


const Home = () => {
	const navigate = useNavigate();
	
	let fetchNotification = () => {
		navigate("/notification");
	};

	const [allUsers, setAllUsers] = useState([]);
	
	useEffect(() => {
		axios
			.post(`${backendURL}/getRecentUsers`, {userId: Cookies.get('userId')})
			.then(response => {
				setAllUsers(response.data.users);
			})
			.catch(err => {
			   alert(err)
				console.log(err);
			});
	}, []);

	return (
		<div style={{height= '100%', overflow: 'hidden'}}>
		
         <HomeNav />
			<div className="w-full bg-zinc-950 text-white min-h-[90vh] mt-[7vh] flex flex-col overflow-x-hidden overflow-y-auto">
				{allUsers.map(user => (
					<div
						key={ user._id }
						className="w-full px-[2vw] h-[8vh] flex items-center text-white overflow-hidden">
						<img
							src={ avatar }
							className="w-[5.5vh] h-[5.5vh] rounded-full border"
						/>

						<div className="h-full pt-[1.55vh] pl-[3vw] w-[90%] flex flex-col">
							<h1 className="self-end absolute">Time</h1>
							<h1 className="text-[1rem] font-black">{user.username}</h1>
							<h1 className="text-[0.7rem] whitespace-nowrap overflow-x-hidden font-normal opacity-[0.8]">
								messags.....
							</h1>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
