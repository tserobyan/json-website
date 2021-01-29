var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var User = new Schema({
    username: { type: String, lowercase: true, unique: true, require: [true, 'Username is required'] },
    email: { type: String, lowercase: true, unique: true, require: [true, 'Email is required'] },
    bio: { type: String },
    image: { type: String },
    hash: { type: String },
    salt: { type: String }
});

User.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

module.exports = mongoose.model('User', User)
