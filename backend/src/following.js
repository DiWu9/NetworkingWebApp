const mongoose = require('mongoose');
const profileSchema = require('./schema/profileSchema');
const Profile = mongoose.model('user_profiles', profileSchema);
const connectionString = 'mongodb+srv://dw58:pwd@cluster0.nbs0gtr.mongodb.net/?retryWrites=true&w=majority';
let cookieKey = "sid";

function getSessionId (req) {
    return req.cookies[cookieKey];
}

function getLoginUsername (req) {
    return req.cookies[getSessionId(req)];
}

/**
 * Get the list of folloing users
 * @param {*} username 
 */
async function getFollowingMongoose (username) {
    let following = await Profile.findOne({'username': username}, 'followed');
    //console.log(following.followed);
    return following.followed;
}

const getFollowing = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = req.params.user ? req.params.user : getLoginUsername(req);
        let followingList = await connector.then(async () => {
            return getFollowingMongoose(username);
        });
        if (!followingList) {
            followingList = [];
        }
        console.log("following: " + followingList);
        msg = {
            'username': username,
            'following': followingList,
        };
        res.send(msg);
    })();
}

const updateFollowing = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let toFollow = req.params.user;
        let followingList = await connector.then(async () => {
            return getFollowingMongoose(username);
        });
        if (!followingList) {
            followingList = [];
        }
        let newFollowingList = [toFollow, ...followingList];
        await Profile.updateOne({'username': username}, {'followed': newFollowingList});
        msg = {
            'username': username,
            'following': newFollowingList,
        };
        res.send(msg);
    })();
}

const removeFollowing = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let toDelete = req.params.user;
        let followingList = await connector.then(async () => {
            return getFollowingMongoose(username);
        });
        if (followingList) {
            let i = followingList.indexOf(toDelete);
            if (i > -1) {
                followingList.splice(i, 1);
            }
            await Profile.updateOne({'username': username}, {'followed': followingList});
        } else {
            followingList = [];
        }
        msg = {
            'username': username,
            'following': followingList,
        };
        res.send(msg);
    })();
}


module.exports = (app) => {
    app.get('/following/:user?', getFollowing);
    app.put('/following/:user', updateFollowing);
    app.delete('/following/:user', removeFollowing);
}