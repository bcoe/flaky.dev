import React from 'react';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
	render() {
		return (
			<Button
				block
				variant="primary"
				href={this.props.authorizationUrl}
				disabled={this.props.loading}
			>
				{this.props.loading ? 'Loading…' : this.props.text}
			</Button>
		);
	}
}

export default Login;
