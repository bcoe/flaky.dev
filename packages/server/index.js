const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const oauth = require('simple-oauth2')
const port = process.env.PORT || 4000
const {v4} = require('uuid')

const oauth2 = oauth.create({
  client: {
    id: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  },
});
const callbackUrl = `${process.env.PUBLIC_URL}/callback/gh`
const corsOptions = {
  origin: process.env.PUBLIC_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json())

app.get('/login/github', cors(corsOptions), (req, res) => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: callbackUrl,
    scope: 'notifications',
    state: v4(),
  });
  res.json({
    authorization_uri: authorizationUri
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))
