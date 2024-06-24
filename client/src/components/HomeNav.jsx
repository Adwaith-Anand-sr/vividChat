import React, { useEffect, useState } from "react";
import { Notifications } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



const HomeNav = () => {
	const navigate = useNavigate();
	let fetchNotification = () => {
		navigate("/notification");
	};
	
	return (
		<div className="fixed flex justify-between bg-zinc-950 text-white pt-[2vh] z-30 px-[3vw] top-0 left-0 w-full h-[7vh]">
			<h1 className="text-3xl font-black">VividChat</h1>
			<div className="flex gap-4">
				<Notifications onClick={fetchNotification} />
			</div>
		</div>
	);
};

export default HomeNav;
