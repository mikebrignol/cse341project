const express = require('express');
const app = express();
require('dotenv').config();

const mongodb = require('./data/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const GitHubStrategy = require('passport-github2').Strategy;

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Z-key, Authorization');
    next();
});

app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}));
app.use(cors({origin: '*'}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Z-key, Authorization');
    next();
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Home route
app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.user}` : 'Not logged in');
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Authentication routes
app.use('/auth', require('./routes/index'));

// API routes
app.use('/items', require('./routes/items'));
app.use('/brands', require('./routes/brands'));


mongodb.initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});