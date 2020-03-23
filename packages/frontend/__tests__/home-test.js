/* global test, expect */

import React from 'react';
import App from '../src/app';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import nock from 'nock';

const DELAY = 25;
nock.disableNetConnect();

test('renders login button if authorize URL can be fetched', done => {
	const request = nock('http://127.0.0.1:4000')
		.get('/login/github')
		.reply(200, {
			authorization_url: 'http://www.github.com//login/oauth/authorize'
		});
	const component = renderer.create(
		<MemoryRouter initialEntries={['/']}>
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
