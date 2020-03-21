/* global test, expect */

import React from 'react';
import Home from '../src/home';
import renderer from 'react-test-renderer';

test('renders home screen with login button', () => {
	const component = renderer.create(
		<Home/>
	);
	// See: https://jestjs.io/docs/en/tutorial-react
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
