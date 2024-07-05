import React, { useEffect, useState } from "react";
import { Stack, CssBaseline } from "@mui/material";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import getSocket from './utils/socket.js'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Authentication from "./pages/auth.jsx";
import Home from "./pages/Home.jsx";
import Notification from "./pages/notification.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import Chat from "./pages/Chat.jsx";



const App = () => {
	const [message, setMessage] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState([]);
   
	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	useEffect(() => {
	   const socket = getSocket();
	   
		socket.on("connect", () => {
			console.log("Connected to server");
		});

		socket.on("message", msg => {
			console.log("Received message from server:", msg);
			setMessage(msg);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from server");
		});

		return () => {
			socket.off("connect");
			socket.off("message");
			socket.off("disconnect");
		};
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Authentication setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
					}
				/>
				<Route
					path="/home"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/notification"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<Notification />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/allusers"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<AllUsers />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/chat/:id"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<Chat />
						</ProtectedRoute>
					}
				/>

			</Routes>
		</BrowserRouter>
	);
};

export default App;
