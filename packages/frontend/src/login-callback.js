import * as fetch from 'node-fetch';
import React from 'react';
import {withRouter} from 'react-router';
import {UserContext} from './context/user-context';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4000';

class BaseLoginCallback extends React.Component {
	async componentDidMount() {
		const parameters = new URLSearchParams(this.props.location.search);
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
			this.props.history.push('/account');
		} else {
			this.props.history.push('/');
		}
	}

	render() {
		return (
			<b>...redirecting</b>
		);
	}
}

const BaseLoginCallbackWithRouter = withRouter(BaseLoginCallback);

const LoginCallback = () => (
	<UserContext.Consumer>
		{({user, setUser}) =>
			<BaseLoginCallbackWithRouter user={user} setUser={setUser}/>}
	</UserContext.Consumer>
);

export default LoginCallback;
