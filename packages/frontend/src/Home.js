import './css/home.css';

import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Login from './login';

const Home = () => {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Alert variant="success">
						<Alert.Heading>Welcome to flaky.dev</Alert.Heading>
						<p>
							Flaky.dev accepts output from your test runs on GitHub, performs
							statistical analysis, and opens and closes issues for flaky tests.
						</p>
						<hr/>
						<p className="mb-0">
							Login with GitHub below to get started.
						</p>
					</Alert>
				</Col>
			</Row>
			<Row>
				<Col/>
				<Col>
					<Login/>
				</Col>
				<Col/>
			</Row>
		</Container>
	);
};

export default Home;
