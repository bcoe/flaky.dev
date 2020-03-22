import './css/login.css';
import * as fetch from 'node-fetch';
import React from 'react';
import {__RouterContext} from 'react-router';
import {UserContext} from './user-context';

const API_URL = process.env.REACT_APP_API_URL;

class BaseLoginCallback extends React.Component {
	async componentDidMount() {
		const parameters = new URLSearchParams(this.props.router.location.search);
		const resp = await fetch(`${API_URL}/login/github`, {
			method: 'POST',
			credentials: 'include',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'text/plain'
			},
			body: JSON.stringify({
				code: parameters.get('code'),
				state: parameters.get('state')
			})
		});
		if (resp.status === 200) {
			const user = await resp.json();
			this.props.setUser(user);
			this.props.router.history.push('/account');
		} else {
			this.props.router.history.push('/');
		}
	}

	render() {
		return (
			<b>...redirecting</b>
		);
	}
}

const LoginCallback = () => (
	<__RouterContext.Consumer>
		{router => (
			<UserContext.Consumer>
				{({user, setUser}) =>
					<BaseLoginCallback user={user} setUser={setUser} router={router}/>}
			</UserContext.Consumer>
		)}
	</__RouterContext.Consumer>
);

export default LoginCallback;
