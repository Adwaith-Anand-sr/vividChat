import React, { useState } from "react";
import {
	Stack,
	TextField,
	Button,
	CircularProgress,
	Typography
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const serverURL = import.meta.env.VITE_SERVER_URL;

const Authentication = ({ setIsAuthenticated }, { setUser }) => {
	const [loading, setLoading] = useState(false);
	const [loginError, setLoginError] = useState(null);
	const [registerError, setRegisterError] = useState(null);

	const [newUser, setNewUser] = useState(false);
	const [username, setUserName] = useState(null);
	const [email, setEmail] = useState(null);
	const [fullname, setFullName] = useState(null);
	const [password, setPassword] = useState(null);

	const navigate = useNavigate();
	const handleUserNameChange = event => {
		setUserName(event.target.value);
	};
	const handleEmailChange = event => {
		setEmail(event.target.value);
	};
	const handleFullNameChange = event => {
		setFullName(event.target.value);
	};
	const handlePasswordChange = event => {
		setPassword(event.target.value);
	};

	const submitLoginForm = event => {
		if (username != null && password != null) {
			setLoading(true);
			const formData = {
				username,
				password
			};
			axios
				.post(`${serverURL}/signin`, formData)
				.then(response => {
				   setIsAuthenticated(true)
				   Cookies.set("token", response.data.token);
				   Cookies.set("userId", response.data.userId)
					navigate("/home");
					setLoading(false);
					console.log("Server response:", response.data);
				})
				.catch(error => {
					setLoginError(error.response.data.message);
					setLoading(false);
					console.error("Error:", error);
				});
		}
	};
	const submitRegisterForm = event => {
		if (
			username != null &&
			fullname != null &&
			password != null &&
			email != null
		) {
			setLoading(true);
			const data = {
				username,
				fullname,
				password,
				email
			};
			axios
				.post(`${serverURL}/signup`, data)
				.then(response => {
				   setIsAuthenticated(true)
				   Cookies.set("token", response.data.token);
				   Cookies.set("userId", response.data.userId)
					navigate("/home");
					setLoading(false);
					console.log("Server response:", response.data);
				})
				.catch(error => {
					setRegisterError(error.response.data.message);
					setLoading(false);
					console.error("Error:", error);
				});
		} else setRegisterError("fillup all required details!");
	};

	return (
		<>
			{loading ? (
				<>
					<div className="w-full absolute z-50 h-screen flex justify-center items-center">
						<CircularProgress />
					</div>
				</>
			) : (
				<></>
			)}
			{newUser ? (
				<>
					<div className="main relative w-full h-[100vh] bg-zinc-500 overflow-hidden">
						<div className="w-[150vh] h-[150vh] top-[10%] left-[-50%] bg-black rounded-full absolute"></div>
						<div className="w-[100vh] h-[100vh] top-[55%] left-[-0%]  bg-pink-600 rounded-full absolute"></div>
						<div className="content w-full h-full top-0 left-0 bg-transparent text-white absolute">
							<div className="content w-full top-[20%] absolute pt-[1vh] pl-[5vw]">
								<h1 className="text-[2.35rem] font-black ">Sign Up</h1>
								<p className="text-[0.5rem] ml-[1vw] text-pink-600 ">
									We are happy to see you here!
								</p>
								<form className="mt-[2.5vh] w-full flex items-center flex-col gap-[2vh] pt-[2vh] h-full">
									<TextField
										style={{
											border: "1px solid white",
											borderRadius: "8px",
											width: "80%"
										}}
										onChange={handleFullNameChange}
										variant="outlined"
										InputProps={{
											style: { color: "white" }
										}}
										InputLabelProps={{
											style: { color: "white" }
										}}
										required
										label="FullName"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "transparent" // Disable blue outline
												}
											}
										}}
									/>
									<TextField
										style={{
											border: "1px solid white",
											borderRadius: "8px",
											width: "80%"
										}}
										onChange={handleUserNameChange}
										required
										InputProps={{
											style: { color: "white" }
										}}
										InputLabelProps={{
											style: { color: "white" }
										}}
										label="username"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "transparent" // Disable blue outline
												}
											}
										}}
									/>
									<TextField
										style={{
											border: "1px solid white",
											borderRadius: "8px",
											width: "80%"
										}}
										onChange={handleEmailChange}
										required
										InputProps={{
											style: { color: "white" }
										}}
										InputLabelProps={{
											style: { color: "white" }
										}}
										type="email"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "transparent" // Disable blue outline
												}
											}
										}}
										label="email"
									/>
									<TextField
										style={{
											border: "1px solid white",
											borderRadius: "8px",
											width: "80%"
										}}
										onChange={handlePasswordChange}
										required
										InputProps={{
											style: { color: "white" }
										}}
										InputLabelProps={{
											style: { color: "white" }
										}}
										label="Password"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "transparent" // Disable blue outline
												}
											}
										}}
										type="password"
									/>
									<Typography style={{ color: "orange" }}>
										{registerError}
									</Typography>
									<Button
										style={{
											borderRadius: "12px",
											backgroundColor: "orange",
											width: "80%",
											padding: "1vh 0",
											marginTop: "1.58vh",
											fontSize: "1rem",
											color: "white",
											fontWeight: "bold"
										}}
										varient="contained"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "transparent" // Disable blue outline
												}
											}
										}}
										disabled={loading}
										onClick={submitRegisterForm}>
										Sign Up
									</Button>
									<p>
										Already have an account?{" "}
										<Button
											style={{ backgroundColor: "transparent" }}
											onClick={() => {
												setNewUser(!newUser);
											}}>
											Sign in
										</Button>{" "}
									</p>
								</form>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="main relative w-full h-[100vh] bg-zinc-500 overflow-hidden">
						<div className="w-[150vh] h-[150vh] top-[10%] left-[-50%] bg-black rounded-full absolute"></div>
						<div className="w-[100vh] h-[100vh] top-[55%] left-[-0%]  bg-pink-600 rounded-full absolute"></div>
						<div className="content w-full h-full top-0 left-0 bg-transparent text-white absolute">
							<div className="content w-full top-[23%] absolute pt-[1vh] pl-[5vw]">
								<h1 className="text-[2.35rem] font-black ">Sign in</h1>
								<form className="mt-[5vh] w-full flex items-center flex-col gap-[2vh] pt-[2vh] h-full">
									<TextField
										style={{
											border: "1px solid white",
											borderRadius: "8px",
											width: "80%"
										}}
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "transparent" // Disable blue outline
												}
											}
										}}
										onChange={handleUserNameChange}
										required
										InputProps={{
											style: { color: "white" }
										}}
										InputLabelProps={{
											style: { color: "white" }
										}}
										label="username"
									/>
									<TextField
										style={{
											border: "1px solid white",
											borderRadius: "8px",
											width: "80%"
										}}
										onChange={handlePasswordChange}
										required
										InputProps={{
											style: { color: "white" }
										}}
										InputLabelProps={{
											style: { color: "white" }
										}}
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "transparent" // Disable blue outline
												}
											}
										}}
										label="Password"
										type="password"
									/>
									<Typography style={{ color: "red" }}>
										{loginError}
									</Typography>
									<Button
										style={{
											borderRadius: "12px",
											backgroundColor: "orange",
											width: "80%",
											padding: "1vh 0",
											marginTop: "5vh",
											fontSize: "1rem",
											color: "white",
											fontWeight: "bold"
										}}
										varient="contained"
										disabled={loading}
										onClick={submitLoginForm}>
										Sign Up
									</Button>
									<p>
										Don't have an account?
										<Button
											style={{ backgroundColor: "transparent" }}
											onClick={() => {
												setNewUser(!newUser);
											}}>
											Sign up
										</Button>{" "}
									</p>
								</form>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Authentication;
