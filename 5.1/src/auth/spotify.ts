import { VITE_CLIENT_ID, VITE_REDIRECT_URI } from "../config"

export const clientId = VITE_CLIENT_ID
export const redirectUri = VITE_REDIRECT_URI

function generateRandomString(length: number) {
	let text = ""
	let possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

async function generateCodeChallenge(codeVerifier: string) {
	function base64encode(str: ArrayBufferLike) {
		return btoa(String.fromCharCode(...new Uint8Array(str)))
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/, "")
	}

	const encoder = new TextEncoder()
	const data = encoder.encode(codeVerifier)
	const digest = await window.crypto.subtle.digest("SHA-256", data)

	return base64encode(digest)
}
async function getCodeVerifier() {
	let codeVerifier = generateRandomString(128)

	const codeChallenge = await generateCodeChallenge(codeVerifier)
	let state = generateRandomString(16)
	let scope = "user-read-private user-read-email playlist-modify-private"

	localStorage.setItem("code_verifier", codeVerifier)

	let args = new URLSearchParams({
		response_type: "code",
		client_id: clientId,
		scope: scope,
		redirect_uri: redirectUri,
		state: state,
		code_challenge_method: "S256",
		code_challenge: codeChallenge,
	})
	//   const url = generateCodeChallenge(codeVerifier).then((codeChallenge) => {

	return "https://accounts.spotify.com/authorize?" + args
}

function getAccessToken(code: string) {
	let codeVerifier = localStorage.getItem("code_verifier")

	let body = new URLSearchParams({
		grant_type: "authorization_code",
		code: code,
		redirect_uri: redirectUri,
		client_id: clientId,
		code_verifier: codeVerifier!,
	})

	fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: body,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("HTTP status " + response.status)
			}
			return response.json()
		})
		.then((data) => {
			console.log(data)
			localStorage.setItem("access_token", data.access_token)
			localStorage.setItem("refresh_token", data.refresh_token)
		})
		.then(() => {
			window.location.href = "/"
		})
		.catch((error) => {
			console.error("Error:", error)
		})
}

export { getCodeVerifier, getAccessToken }
