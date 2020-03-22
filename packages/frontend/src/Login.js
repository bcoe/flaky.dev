import './css/login.css';
import * as fetch from 'node-fetch';
import React from 'react';
import Button from 'react-bootstrap/Button';

const API_URL = process.env.REACT_APP_API_URL;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	async componentDidMount() {
		const resp = await fetch(`${API_URL}/login/github`, {
			credentials: 'include'
		})
			.then(_resp => {
				return _resp.json();
			});
		this.setState({
			loading: false,
			authorizationUri: resp.authorization_uri
		});
	}

	render() {
		return (
			<Button
				block
				variant="primary"
				href={this.state.authorizationUri}
				disabled={this.state.loading}
			>
				{this.state.loading ? 'Loading…' : 'Login with GitHub'}
			</Button>
		);
	}
}

export default Login;
