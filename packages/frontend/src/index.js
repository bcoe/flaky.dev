/* global document */

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render((
	<App/>
), document.querySelector('#root'));
