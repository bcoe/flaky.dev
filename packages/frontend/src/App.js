import './css/app.css';

import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
	// Link
} from 'react-router-dom';
import Home from './home';
import Account from './account';
import LoginCallback from './login-callback';
import PrivateRoute from './private-route';
import {UserContext} from './user-context';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {authenticated: false},
			setUser: user => {
				this.setState(() => {
					return {
						user
					};
				});
			}
		};
	}

	render() {
		return (
			<UserContext.Provider value={this.state}>
				<Router>
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
				</Router>
			</UserContext.Provider>
		);
	}
}

export default App;

