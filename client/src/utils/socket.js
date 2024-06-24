import { io } from "socket.io-client";

let socket;
const serverURL = import.meta.env.VITE_SERVER_URL;

const getSocket = () => {
	if (!socket) {
		socket = io(serverURL);
	}
	return socket;
};

export default getSocket;
