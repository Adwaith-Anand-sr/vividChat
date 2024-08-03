import AsyncStorage from "@react-native-async-storage/async-storage";
const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

import getTokenExpirationDate from './getTokenExpirationDate.js'

const shouldRefreshToken = (token) => {
    const expirationDate = getTokenExpirationDate(token);
    return (expirationDate - new Date()) < REFRESH_THRESHOLD;
};

const refreshTokenIfNeeded = async () => {
	const refreshToken = await AsyncStorage.getItem('refreshToken');
	let idToken = await AsyncStorage.getItem('idToken');

	if (!refreshToken) {
		throw new Error("No refresh token found");
	}

	if (shouldRefreshToken(idToken)) {
		idToken = await refreshToken(refreshToken);
	}

	return idToken;
};

export default refreshTokenIfNeeded;
