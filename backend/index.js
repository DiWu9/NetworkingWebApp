const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = {origin: 'http://localhost:4000', credentials: true};

const articles = require('./src/articles.js');
const auth = require('./src/auth.js');
const following = require('./src/following.js');
const profile = require('./src/profile.js');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
auth(app);
articles(app);
following(app);
profile(app);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});