import Constants from "expo-constants";
const apiKey = Constants.expoConfig.extra.firebaseApiKey;
const databaseURL = Constants.expoConfig.extra.dbUrl;

const refreshToken = async refreshToken => {
	const response = await fetch(
		`https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `grant_type=refresh_token&refresh_token=${refreshToken}`
		}
	);

	const data = await response.json();
	if (response.ok) {
		return {
			idToken: data.id_token,
			refreshToken: data.refresh_token,
			expiresIn: data.expires_in
		};
	} else {
		throw new Error(data.error.message);
	}
};

const handleTokenRefresh = async currentRefreshToken => {
	try {
		const { idToken, refreshToken, expiresIn } =
			await refreshToken(currentRefreshToken);
		console.log("New ID Token:", idToken);
		console.log("New Refresh Token:", refreshToken);
		console.log("Token Expires In:", expiresIn);
	} catch (error) {
		console.error("Error refreshing token:", error);
	}
};

const signUp = async (username, password) => {
	const response = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: username,
				password: password,
				returnSecureToken: true
			})
		}
	);

	const data = await response.json();
	if (response.ok) {
		const userId = data.localId;
		const idToken = data.idToken;
		const refreshToken = data.refreshToken;

		await fetch(`${dbUrl}/users/${userId}.json?auth=${idToken}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username })
		});
		return { userId, idToken, refreshToken };
	} else {
		throw new Error(data.error.message);
	}
};

const signIn = async (username, password) => {
	const response = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: username,
				password: password,
				returnSecureToken: true
			})
		}
	);

	const data = await response.json();
	if (response.ok) {
		return {
			userId: data.localId,
			idToken: data.idToken,
			refreshToken: data.refreshToken
		};
	} else {
		throw new Error(data.error.message);
	}
};

export default firebaseConfig;
