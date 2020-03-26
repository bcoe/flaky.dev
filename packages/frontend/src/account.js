import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {withRouter} from 'react-router';
import {UserContext} from './context/user-context';

class BaseAccount extends React.Component {
	render() {
		return (
			<Container fluid>
				<Row>
					<Col>
						<Alert variant="success">
							<Alert.Heading>Welcome to flaky.dev {this.props.user.name}</Alert.Heading>
							<p>
								You are currently logged in to an acccount, good work!
							</p>
							<hr/>
							<p className="mb-0">
								look at me go! <img src={this.props.user.avatar_url}/>
							</p>
						</Alert>
					</Col>
				</Row>
			</Container>
		);
	}
}

const BaseAccountWithRouter = withRouter(BaseAccount);

const Account = () => (
	<UserContext.Consumer>
		{({user, setUser}) =>
			<BaseAccountWithRouter user={user} setUser={setUser}/>}
	</UserContext.Consumer>
);

export default Account;
