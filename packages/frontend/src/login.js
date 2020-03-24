import React from 'react';
import Button from 'react-bootstrap/Button';
import {getAuthorizationUrl} from './api/github';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	async componentDidMount() {
		const authorizationUrl = await getAuthorizationUrl();
		this.setState({
			loading: false,
			authorizationUrl
		});
	}

	render() {
		return (
			<Button
				block
				variant="primary"
				href={this.state.authorizationUrl}
				disabled={this.state.loading}
			>
				{this.state.loading ? 'Loading…' : this.props.text}
			</Button>
		);
	}
}

export default Login;
