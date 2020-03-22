const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const oauth = require('simple-oauth2');
const port = process.env.PORT || 4000;
const session = require('express-session');
const sess = {
	secret: 'keyboard cat',
	cookie: {},
	saveUninitialized: true,
	resave: true
};
const {v4} = require('uuid');

if (app.get('env') === 'production') {
	sess.cookie.secure = true; // Serve secure cookies
}

const oauth2 = oauth.create({
	client: {
		id: process.env.GITHUB_CLIENT_ID,
		secret: process.env.GITHUB_CLIENT_SECRET
	},
	auth: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize'
	}
});
const callbackUrl = `${process.env.PUBLIC_URL}/callback/gh`;
const corsOptions = {
	origin: process.env.PUBLIC_URL,
	optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
	credentials: true
};

app.use(bodyParser.json());
app.use(session(sess));

app.get('/login/github', cors(corsOptions), (request, response) => {
	request.session.user = {
		name: 'bcoe'
	};
	const authorizationUri = oauth2.authorizationCode.authorizeURL({
		redirect_uri: callbackUrl,
		scope: 'notifications',
		state: v4()
	});
	response.json({
		authorization_uri: authorizationUri
	});
});

app.listen(port, () => console.log(`listening on port ${port}`));
