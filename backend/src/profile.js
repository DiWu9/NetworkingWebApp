const mongoose = require('mongoose');
const infoSchema = require('./schema/infoSchema');
const profileSchema = require('./schema/profileSchema');
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
 * find user's profile
 * @param {*} username 
 * @returns 
 */
async function findProfile(username) {
    return await Profile.findOne({username: username});
}

/**
 * update user's headline by modifying user_profiles table
 * @param {*} username 
 * @param {*} newHeadline 
 */
async function updateHeadlineMongoose(username, newHeadline) {
    await Profile.updateOne({username: username}, {status: newHeadline});
}

/**
 * get user's headline
 * @param {*} req 
 * @param {*} res 
 */
const getHeadline = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = req.params.user;
        if (!username) username = getLoginUsername(req);
        let profile = await connector.then(async () => {
            return findProfile(username);
        });
        let msg = {
            username: username,
            headline: ""
        };
        if (profile) {
            msg = {
                username: username,
                headline: profile.status
            };
        }
        res.send(msg);
    })();
}

/**
 * endpoint: update user's headline
 * @param {*} req 
 * @param {*} res 
 */
const updateHeadline = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let newHeadline = req.body.headline;
        let username = getLoginUsername(req);
        await connector.then(async () => {
            updateHeadlineMongoose(username, newHeadline);
        });
        res.send({
            username: username,
            headline: newHeadline
        });
    })();
}

/**
 * get email address of login user
 * @param {*} req 
 * @param {*} res 
 */
const getEmail = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = req.params.user ? req.params.user : getLoginUsername(req);
        let email = await connector.then(async () => {
            return await Info.findOne({'username': username}, 'email');
        });
        email = email.email;
        res.send({
            username: username,
            email: email
        });
    })();
}

/**
 * update email address of login user
 * @param {*} req 
 * @param {*} res 
 */
const updateEmail = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let newEmail = req.body.email;
        await connector.then(async () => {
            await Info.updateOne({username: username}, {email: newEmail});
        });
        res.send({
            username: username,
            email: newEmail
        });
    })();
}

/**
 * get dob of login user
 * @param {*} req 
 * @param {*} res 
 */
const dob = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = req.params.user ? req.params.user : getLoginUsername(req);
        let dob = await connector.then(async () => {
            return await Info.findOne({'username': username}, 'dob');
        });
        dob = dob.dob.getTime();
        res.send({
            username: username,
            dob: dob
        });
    })();
}

/**
 * get zip of login user
 * @param {*} req 
 * @param {*} res 
 */
const getZip = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = req.params.user ? req.params.user : getLoginUsername(req);
        let zip = await connector.then(async () => {
            return await Info.findOne({'username': username}, 'zip');
        });
        zip = zip.zip;
        res.send({
            username: username,
            zipcode: zip
        });
    })();
}

/**
 * update zip of login user
 * @param {*} req 
 * @param {*} res 
 */
const updateZip = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let newZip = req.body.zipcode;
        await connector.then(async () => {
            await Info.updateOne({username: username}, {zip: newZip});
        });
        res.send({
            username: username,
            zipcode: newZip
        });
    })();
}

/**
 * get phone number of a user
 * @param {*} req 
 * @param {*} res 
 */
 const getPhone = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = req.params.user ? req.params.user : getLoginUsername(req);
        let phone = await connector.then(async () => {
            return await Info.findOne({'username': username}, 'phone');
        });
        phone = phone.phone;
        res.send({
            username: username,
            phone: phone
        });
    })();
}

/**
 * update phone of login user
 * @param {*} req 
 * @param {*} res 
 */
const updatePhone = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let newPhone = req.body.phone;
        await connector.then(async () => {
            await Info.updateOne({username: username}, {phone: newPhone});
        });
        res.send({
            username: username,
            phone: newPhone
        });
    })();
}

/**
 * get display name of login user
 * @param {*} req 
 * @param {*} res 
 */
 const getDisplayName = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = req.params.user ? req.params.user : getLoginUsername(req);
        let displayName = await connector.then(async () => {
            return await Info.findOne({'username': username}, 'displayName');
        });
        displayName = displayName.displayName;
        res.send({
            username: username,
            displayName: displayName
        });
    })();
}

/**
 * update display name of login user
 * @param {*} req 
 * @param {*} res 
 */
const updateDisplayName = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let newDisplayName = req.body.displayName;
        await connector.then(async () => {
            await Info.updateOne({username: username}, {displayName: newDisplayName});
        });
        res.send({
            username: username,
            displayName: newDisplayName
        });
    })();
}


/**
 * get avatar of login user
 * @param {*} req 
 * @param {*} res 
 */
const getAvatar = (req, res) => {
    let username = getLoginUsername(req);
    res.send({
        "username": username,
        "avatar": ""
    });
}

/**
 * update avatar of login user
 * @param {*} req 
 * @param {*} res 
 */
const updateAvatar = (req, res) => {
    let username = getLoginUsername(req);
    res.send({
        "username": username,
        "avatar": ""
    });
}


module.exports = (app) => {
    app.put('/headline', updateHeadline);
    app.get('/headline/:user?', getHeadline);
    app.get('/email/:user?', getEmail);
    app.put('/email', updateEmail);
    app.get('/dob/:user?', dob);
    app.get('/zipcode/:user?', getZip);
    app.put('/zipcode', updateZip);
    app.get('/avatar/:user?', getAvatar);
    app.put('/avatar', updateAvatar);
    app.get('/phone/:user?', getPhone);
    app.put('/phone', updatePhone);
    app.get('/displayName/:user?', getDisplayName);
    app.put('/displayName', updateDisplayName);
}