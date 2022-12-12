const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://dw58:pwd@cluster0.nbs0gtr.mongodb.net/?retryWrites=true&w=majority';
const articleSchema = require('./schema/articleSchema');
const profileSchema = require('./schema/profileSchema');
const Article = mongoose.model('articles', articleSchema);
const Profile = mongoose.model('user_profiles', profileSchema);
let cookieKey = "sid";

function getSessionId (req) {
    return req.cookies[cookieKey];
}

function getLoginUsername (req) {
    return req.cookies[getSessionId(req)];
}

async function createArticle(pid, author, text, date, comments) {
    return new Article({
        pid,
        author,
        text,
        date,
        comments
    }).save();
}

/**
 * @returns The total number of articles
 */
async function countArticles() {
    return await Article.count();
}

/**
 * @param {*} username 
 * @returns The articles authored by the login user and followed users
 */
async function findArticlesFeed(username) {
    let followedList = await Profile.findOne({'username' : username} , 'followed');
    if (followedList) {
        followedList = followedList.followed;
    }
    let usersToQuery = [username, ...followedList];
    return await Article.find({'author': usersToQuery}).exec();
}

/**
 * 
 * @param {*} username 
 * @returns The articles authored by this user
 */
async function findArticlesByAuthor(username) {
    return await Article.find({author: username}).exec();
}

/**
 * 
 * @param {*} id 
 * @returns The article of this id
 */
async function findArticleById(id) {
    return await Article.find({pid: id}).exec();
}

/**
 * check if this user writes this article
 * @param {*} username username
 * @param {*} id article id
 */
async function hasArticle(username, pid) {
    let authorName = await Article.findOne({'pid' : pid} , 'author');
    if (authorName) {
        return authorName.author == username;
    }
    return false;
}

/**
 * update article of pid, do nothing if username doesn't own this article: 
 *  - update text if commentId is not supplied
 *  - update comment of commentId if commentId >= 0
 *  - add a new comment if commentId = -1
 * @param {*} username 
 * @param {*} pid 
 * @param {*} text 
 * @param {*} commentId 
 */
async function updatePostMongoose(username, pid, text, commentId) {
    let isArticleOwner = await hasArticle(username, pid);
    if (!isArticleOwner) {
        return;
    }
    if (!commentId && commentId != 0) {
        Article.updateOne({author: username, pid: pid}, {text: text}, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated Docs: ", docs);
            }
        });
    } else {
        if (commentId == -1) {
            console.log("insert comment");
            Article.updateOne({author: username, pid: pid}, {$push: {comments: text}}, function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Updated Docs: ", docs);
                }
            });
        } else {
            console.log("update comment");
            let comments = await Article.findOne({author: username, pid: pid}, 'comments').exec();
            let commentArray = comments.comments;
            commentArray[commentId] = text;
            console.log(commentArray);
            Article.updateOne({author: username, pid: pid}, {comments: commentArray}, function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Updated Docs: ", docs);
                }
            });
        }
    }
}

/**
 * get articles:
 *  - get articles authored by login user and followed users if no id
 *  - get articles authored by a user if id is a username
 *  - get article of this id if id is id
 * @param {*} req 
 * @param {*} res 
 */
const getArticles = (req, res) => {
    (async () => {
        let username = getLoginUsername(req);
        let param = req.params.id;
        let articles;
        let number = /^[0-9]+$/;
        if (param) {
            if (param.match(number)) {
                console.log("is integer");
                articles = await findArticleById(param);
            } else {
                console.log("is username");
                articles = await findArticlesByAuthor(param);
            }
            res.send({
                articles: articles
            });
        } else {
            articles = await findArticlesFeed(username);
            res.send({
                articles: articles
            });
        }
        
    })();
}

/**
 * update texts or comments of an article
 * @param {*} req 
 * @param {*} res 
 */
const updateArticles = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let username = getLoginUsername(req);
        let pid = req.params.id;
        let text = req.body.text;
        let commentId = req.body.commentId;
        await connector.then(async () => {
            await updatePostMongoose(username, pid, text, commentId);
        });
        let articles = await connector.then(async () => {
            return findArticlesByAuthor(username);
        });
        res.send({
            articles: articles
        });
    })();
}

/**
 * post a new article
 * @param {*} req 
 * @param {*} res 
 */
const article = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        let numArticles = await connector.then(async () => {
            return countArticles();
        });
        let id = numArticles+1;
        let author = getLoginUsername(req);
        let text = req.body.text;
        let date = new Date().getTime();
        let comments = [];
        await createArticle(id, author, text, date, comments);
        let articles = await connector.then(async () => {
            return findArticlesByAuthor(author);
        });
        res.send({
            articles: articles
        });
    })();
}


module.exports = (app) => {
    app.get('/articles/:id?', getArticles);
    app.put('/articles/:id', updateArticles);
    app.post('/article', article);
}