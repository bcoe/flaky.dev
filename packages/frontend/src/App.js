import './css/app.css';

import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
	// Link
} from 'react-router-dom';
import Home from './home';

const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/">
						<Home/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;

