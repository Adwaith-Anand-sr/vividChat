import base64 from "base-64";

const base64UrlDecode = str => {
	const base64Str = str.replace(/-/g, "+").replace(/_/g, "/");
	const padding =
		base64Str.length % 4 === 0 ? "" : "=".repeat(4 - (base64Str.length % 4));
	const base64WithPadding = base64Str + padding;

	try {
		const binary = base64.decode(base64WithPadding);
		const text = decodeURIComponent(escape(binary));
		return text;
	} catch (error) {
		console.error("Base64 URL decoding error:", error);
		throw new Error("Invalid Base64 URL encoded string");
	}
};

const getTokenExpirationDate = token => {
	try {
		const parts = token.split(".");
		if (parts.length !== 3) {
			throw new Error("JWT does not have 3 parts");
		}
		const payload = base64UrlDecode(parts[1]);
		const decodedPayload = JSON.parse(payload);

		if (!decodedPayload.exp) {
			throw new Error("No exp claim in token payload");
		}
		return new Date(decodedPayload.exp * 1000);
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};

export default getTokenExpirationDate;
