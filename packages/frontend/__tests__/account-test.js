/* global test, expect */

import React from 'react';
import renderer from 'react-test-renderer';
import nock from 'nock';

import {Router} from 'react-router';
import {MemoryRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import App from '../src/app';
import Account from '../src/account';
import PrivateRoute from '../src/private-route';

const DELAY = 25;
nock.disableNetConnect();

test('redirects to / if no user session found', done => {
	const history = createMemoryHistory();
	const request = nock('http://127.0.0.1:4000')
		.get('/user')
		.reply(404);

	renderer.create(
		<Router history={history}>
			<PrivateRoute exact path="/account">
				<Account/>
			</PrivateRoute>
		</Router>
	);
	setTimeout(() => {
		expect(history.location.pathname).toBe('/');
		request.done();
		return done();
	}, DELAY);
});

test('renders account page if user session exists', done => {
	const request = nock('http://127.0.0.1:4000')
		.get('/user')
		.reply(200, {
			login: 'bcoe',
			name: 'Benjamin Coe'
		});
	const component = renderer.create(
		<MemoryRouter initialEntries={['/account']}>
			<App/>
		</MemoryRouter>
	);
	setTimeout(() => {
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
		request.done();
		return done();
	}, DELAY);
});
