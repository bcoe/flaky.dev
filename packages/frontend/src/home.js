import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Login from './login';
import {ErrorContext} from './context/error-context';

class BaseHome extends React.Component {
	render () {
		return (
			<Container className="home" fluid>
				<Row className="header">
					<Col md={10}>flaky.dev</Col>
					<Col>
						<Login text="Login with GitHub" />
					</Col>
				</Row>
				{(() => {
					if (this.props.error.msg) {
						return (<Row>
							<Col md={{ span: 6, offset: 3 }}>
								<Alert variant={'danger'}>{this.props.error.msg}</Alert>
							</Col>
						</Row>)
					}
	      })()}
				<Row>
					<Col md={{ span: 6, offset: 2 }}>
						<h1>Stop wrestling with flaky tests</h1>
						<p>
							flaky.dev collects information from your tests runs, performs
							statistical analysis, and helps you keep on top of failing tests.
						</p>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
					</Col>
					<Col md={6}>
						<Login text="Create an Account" />
					</Col>
				</Row>
			</Container>
		);
	}
};

const Home = () => (
	<ErrorContext.Consumer>
		{({error}) =>
			<BaseHome error={error} />}
	</ErrorContext.Consumer>
);

export default Home;
