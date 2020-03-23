import React from 'react';
import {UserContext} from './user-context';
import {__RouterContext} from 'react-router';
import {
	Route,
	Redirect
} from 'react-router-dom';
import {getUserSession} from './api/account';

class BasePrivateRoute extends Route {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	async componentDidMount() {
		try {
			const user = await getUserSession();
			this.props.setUser(user);
		} catch (error) {
			if (error.code === 404) {
				console.info(error.code);
			}

			this.props.setUser({});
		}

		this.setState(() => {
			return {
				loading: false
			};
		});
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

