/* global document */

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {
	BrowserRouter as Router
} from 'react-router-dom';

ReactDOM.render((
	<Router>
		<App/>
	</Router>
), document.querySelector('#root'));
