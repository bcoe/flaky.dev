import * as fetch from 'node-fetch';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4000';

export async function getAuthorizationUrl() {
	const resp = await fetch(`${API_URL}/login/github`, {
		credentials: 'include',
		cache: 'no-cache'
	});
	const body = await resp.json();
	return body.authorization_url;
}
