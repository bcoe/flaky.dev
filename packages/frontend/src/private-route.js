import React from 'react';
import {UserContext} from './user-context';
import {__RouterContext} from 'react-router';
import {
	Route,
	Redirect
} from 'react-router-dom';

class BasePrivateRoute extends Route {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
		setTimeout(() => {
			this.setState(() => {
				return {
					loading: false
				};
			});
		}, 3000);
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
			if (user.authenticated) {
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
				{({user}) =>
					<BasePrivateRoute {...rest} user={user} router={router}/>}
			</UserContext.Consumer>
		)}
	</__RouterContext.Consumer>
);

export default PrivateRoute;

