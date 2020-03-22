import React from 'react';
import {UserContext} from './user-context';
import * as fetch from 'node-fetch';
import {__RouterContext} from 'react-router';
import {
	Route,
	Redirect
} from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

class BasePrivateRoute extends Route {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	async componentDidMount() {
		const resp = await fetch(`${API_URL}/user`, {
			credentials: 'include',
			cache: 'no-cache'
		});
		if (resp.status === 200) {
			const user = await resp.json();
			this.props.setUser(user);
			this.setState(() => {
				return {
					loading: false
				};
			});
		}
	}

	render() {
		if (this.state.loading) {
			return (
				<b>loading...</b>
			);
		}

		const {user} = this.props;
		const {match} = this.props.router;
		if (match) {
			if (user.login) {
				return super.render();
			}

			return <Redirect to="/"/>;
		}

		return super.render();
	}
}

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({component: Component, ...rest}) => (
	// eslint-disable-next-line react/jsx-pascal-case
	<__RouterContext.Consumer>
		{router => (
			<UserContext.Consumer>
				{({user, setUser}) =>
					<BasePrivateRoute {...rest} user={user} setUser={setUser} router={router}/>}
			</UserContext.Consumer>
		)}
	</__RouterContext.Consumer>
);

export default PrivateRoute;

