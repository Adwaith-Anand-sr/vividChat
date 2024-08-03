import getTokenExpirationDate from './getTokenExpirationDate.js'

const isTokenExpired = token => {
	const expirationDate = getTokenExpirationDate(token);
	if (!expirationDate) {
		return true; // Consider token expired if we can't decode
	}
	return expirationDate < new Date();
};

export default isTokenExpired;