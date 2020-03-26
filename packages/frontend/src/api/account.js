import * as fetch from 'node-fetch';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4000';

export async function getUserSession() {
	try {
		const resp = await fetch(`${API_URL}/user`, {
			credentials: 'include',
			cache: 'no-cache'
		});
		if (resp.status === 200) {
			return await resp.json();
		}

		if (resp.status === 404) {
			const err = new Error('could not find user session, please login');
			err.code = 404;
			throw err;
		} else {
			const err = new Error('unexpected error, try again later');
			err.code = 500;
			throw err;
		}
	} catch (error) {
		if (!error.code) {
			console.error(error);
			const err = new Error('unexpected error, try again later');
			err.code = 500;
			throw err;
		}

		throw error;
	}
}
