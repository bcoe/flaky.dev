import './css/login.css';

import React from 'react';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
	constructor(props) {
		super(props);
		// eslint-disable-next-line react/state-in-constructor
		this.state = {
			loading: true
		};
		this.handleClick = this.handleClick.bind(this);
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 2000);
	}

	handleClick() {
		console.info('I am clicked');
	}

	render() {
		return (
			<Button
				block
				variant="primary"
				disabled={this.state.loading}
				onClick={this.state.loading ? null : this.handleClick}
			>
				{this.state.loading ? 'Loading…' : 'Login with GitHub'}
			</Button>
		);
	}
}

export default Login;
