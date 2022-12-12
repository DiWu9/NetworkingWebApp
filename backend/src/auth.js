const md5 = require('md5')
const mongoose = require('mongoose');
const userSchema = require('./schema/userSchema');
const profileSchema = require('./schema/profileSchema');
const infoSchema = require('./schema/infoSchema');
const User = mongoose.model('users', userSchema);
const Profile = mongoose.model('user_profiles', profileSchema);
const Info = mongoose.model('user_info', infoSchema);
const connectionString = 'mongodb+srv://dw58:pwd@cluster0.nbs0gtr.mongodb.net/?retryWrites=true&w=majority';
let cookieKey = "sid";

function getSessionId (req) {
    return req.cookies[cookieKey];
}

function getLoginUsername (req) {
    return req.cookies[getSessionId(req)];
}

/**
 * check if user is logged in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function isLoggedIn(req, res, next) {
    if (!req.cookies) {
        return res.sendStatus(401);
    }
    let sid = req.cookies[cookieKey];
    if (!sid) {
        return res.sendStatus(401);
    }
    let username = req.cookies[sid];
    if (username) {
        req.username = username;
        next();
    }
    else {
        return res.sendStatus(401)
    }
}


/**
 * store username and password to users table
 * @param {*} username 
 * @param {*} salt 
 * @param {*} hash 
 * @returns 
 */
async function createUser(username, salt, hash) {
    return new User({
        username,
        salt,
        hash
    }).save();
}


/**
 * store username, headlinle, followed list, and profile picture to user_profiles table
 * @param {*} username 
 * @param {*} status 
 * @param {*} followed 
 * @param {*} picture 
 * @returns 
 */
async function createProfile(username, status, followed, picture) {
    return new Profile({
        username,
        status,
        followed,
        picture
    }).save();
}

async function createUserInfo(username, email, dob, zip, displayName, phone) {
    return new Info({
        username, 
        email,
        dob,
        zip,
        displayName,
        phone
    }).save();
}


/**
 * find user's username and password
 * @param {*} username 
 * @returns 
 */
async function findUser(username) {
    return await User.findOne({username: username});
}

/**
 * find user's profile
 * @param {*} username 
 * @returns 
 */
async function findProfile(username) {
    return await Profile.findOne({username: username});
}


/**
 * login user by username and password
 * @param {*} req 
 * @param {*} res 
 */
const login = (req, res) => {
    (async () => {
        console.log("login called");
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = req.body.username;
        let password = req.body.password;
        console.log(req.body);
        console.log("username: " + username);
        console.log("password: " + password);
        if (!username || !password) {
            return res.sendStatus(400);
        }

        let user = await connector.then(async () => {
            return findUser(username);
        });

        // check user exists
        if (!user) {
            return res.sendStatus(400);
        }

        let salt = user.salt;
        let hash = md5(salt + password);
        
        // password check
        if (hash != user.hash) {
            return res.sendStatus(400);
        }

        const sessionKey = md5(username + new Date().getTime() + "abc");
        res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: false, sameSite: 'None', secure: true});
        res.cookie(sessionKey, username, {maxAge: 3600*1000, httpOnly: false, sameSite: 'None', secure: true});
        console.log("login sid: " + sessionKey);
        msg = {
            username: username,
            result: 'success'
        };
        res.send(msg);
    })();
}

/**
 * logout current user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const logout = (req, res) => {
    let sessionKey = getSessionId(req);
    delete req.cookies[cookieKey];
    delete req.cookies[sessionKey];
    res.clearCookie(cookieKey);
    res.clearCookie(sessionKey);
    return res.sendStatus(200);
}


/**
 * register a new user
 * @param {*} req 
 * @param {*} res 
 */
const register = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(req.body);
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let dob = req.body.dob;
        let zip = req.body.zip;
        let displayName = req.body.displayName;
        let phone = req.body.phone;
        if (!username || !password) {
            return res.sendStatus(400);
        }

        let salt = username + new Date().getTime();
        let hash = md5(salt + password);

        let user = await connector.then(async () => {
            return findUser(username);
        });

        if (user) {
            return res.sendStatus(400);
        } else {
            await createUser(username, salt, hash);
            await createProfile(username, "", [], "");
            await createUserInfo(username, email, dob, zip, displayName, phone);
            const sessionKey = md5(username + new Date().getTime() + "abc");
            res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: false, sameSite: 'None', secure: true});
            res.cookie(sessionKey, username, {maxAge: 3600*1000, httpOnly: false, sameSite: 'None', secure: true});
            console.log("register sid: " + sessionKey);
            msg = {
                username: username,
                result: 'success'
            };
            res.send(msg);
        }
    })();
}


/**
 * update login user's password
 * @param {*} req 
 * @param {*} res 
 */
const password = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let newPassword = req.body.password;
        let salt = username + new Date().getTime();
        let hash = md5(salt + newPassword);
        console.log("new salt: " + salt);
        console.log("new hash: " + hash);
        await connector.then(async () => {
            await User.updateOne({'username': username}, {'salt':salt, 'hash':hash});
        });
        msg = {
            'username': username,
            'result': 'success'
        };
        res.send(msg);
    })();
}

/**
 * verify if password is correct
 * @param {*} req 
 * @param {*} res 
 */
 const verifyPassword = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let password = req.body.password;
        console.log("password: " + password);

        let user = await connector.then(async () => {
            return findUser(username);
        });

        // check user exists
        if (!user) {
            return res.sendStatus(400);
        }

        let salt = user.salt;
        let hash = md5(salt + password);
        
        // password check
        if (hash != user.hash) {
            return res.sendStatus(400);
        }
        msg = {
            username: username,
            result: 'success'
        };
        res.send(msg);
    })();
}

module.exports = (app) => {
    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);
    app.put('/logout', logout);
    app.put('/password', password);
    app.post('/verifyPassword', verifyPassword);
}