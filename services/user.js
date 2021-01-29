var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = toString(process.env.secret);
var User = require('../models/user');

function validPassword(password, user) {
    var hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
    return user.hash === hash;
};

function generateJWT(user) {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: user.id,
        username: user.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

function toAuthJSON(user) {
    return {
        username: user.username,
        email: user.email,
        token: generateJWT(user),
        bio: user.bio,
        image: user.image
    };
};

exports.getUsers = () => {
    return User.find();
}
exports.getUser = (username) => {
    return User.findOne({ 'username': username });
}

exports.register = (obj) => {
    var user = new User(obj);
    user.setPassword(obj.password);
    return user.save();
}

exports.login = (obj, user) => {
    if (validPassword(obj.password, user)) {
        return toAuthJSON(user);
    }
    return { message: 'Wrong password' };
}

exports.access = (token) => {
    if (token) {
        var decoded = jwt.verify(token, secret, function (response, err) {
            return err ? err : response;
        })
        return decoded;
    }
    return { message: 'No login token' }
}

