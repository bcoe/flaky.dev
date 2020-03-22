import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Account = () => {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Alert variant="success">
						<Alert.Heading>Welcome to flaky.dev</Alert.Heading>
						<p>
							You are currently logged in to an acccount, good work!
						</p>
						<hr/>
						<p className="mb-0">
							This is my account
						</p>
					</Alert>
				</Col>
			</Row>
		</Container>
	);
};

export default Account;
