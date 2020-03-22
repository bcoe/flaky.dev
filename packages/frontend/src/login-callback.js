import './css/login.css';
// Import * as fetch from 'node-fetch';
import React from 'react';
import {__RouterContext} from 'react-router';
import {UserContext} from './user-context';
// TODO: add prop types.

class BaseLoginCallback extends React.Component {
	async componentDidMount() {
		this.props.setUser({
			authenticated: true
		});
		setTimeout(() => {
			this.props.router.history.push('/account');
		}, 1000);
	}

	render() {
		return (
			<b>Hello World!</b>
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
