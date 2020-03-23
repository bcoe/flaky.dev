import React from 'react';
import {UserContext} from './user-context';
import {withRouter} from 'react-router';
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
		if (this.match) {
			if (user.login) {
				return super.render();
			}

			return <Redirect to="/"/>;
		}

		return super.render();
	}
}

const BasePrivateRouteWithRouter = withRouter(BasePrivateRoute);

const PrivateRoute = ({component: Component, ...rest}) => (
	<UserContext.Consumer>
		{({user, setUser}) =>
			<BasePrivateRouteWithRouter {...rest} user={user} setUser={setUser}/>}
	</UserContext.Consumer>
);

export default PrivateRoute;
