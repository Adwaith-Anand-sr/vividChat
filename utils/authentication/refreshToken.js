import AsyncStorage from "@react-native-async-storage/async-storage";
const refreshToken = async refreshToken => {
	try {
		const response = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/token?key=${apiKey}`,
			{
				grant_type: "refresh_token",
				refresh_token: refreshToken
			}
		);
		const { id_token: newIdToken } = response.data;
		AsyncStorage.setItem('newIdToken', newIdToken);
		return newIdToken;
	} catch (error) {
		console.error(
			"Token refresh error:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

export default refreshToken;
