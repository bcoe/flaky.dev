import React from 'react';
import {
	Switch,
	Route
} from 'react-router-dom';
import Home from './home';
import Account from './account';
import LoginCallback from './login-callback';
import PrivateRoute from './private-route';
import {UserContext} from './context/user-context';
import {ErrorContext} from './context/error-context';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			setUser: user => {
				this.setState(() => {
					return {
						user
					};
				});
			},
			error: {},
			setError: error => {
				this.setState(() => {
					return {
						error
					};
				});
			}
		};
	}

	render() {
		return (
			<ErrorContext.Provider value={this.state}>
				<UserContext.Provider value={this.state}>
					<div>
						<Switch>
							<Route exact path="/">
								<Home/>
							</Route>
							<PrivateRoute exact path="/account" component={Account}>
								<Account/>
							</PrivateRoute>
							<Route exact path="/callback/gh">
								<LoginCallback/>
							</Route>
						</Switch>
					</div>
				</UserContext.Provider>
			</ErrorContext.Provider>
		);
	}
}

export default App;

