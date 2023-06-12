const bcrypt = require('bcrypt');

const User = require('../models/User');

async function register(username, password) {
    //check if username is taken
    const existing = await User.findOne({ username: { $regex: new RegExp(username), $options: 'i' } });
    if (existing) {
        throw new Error('Username is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);  //hash password

    const user = await User.create({ username, hashedPassword });  //create and save user

    return {
        _id: user._id,
        username: user.username,
        roles: user.roles,
    };
}

async function login(username, password) {
    //check if username exists //{ $regex: new RegExp(username) }
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect username or password!');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect username or password!');
    }

    return {
        _id: user._id,
        username: user.username,
        roles: user.roles,
    };
};

module.exports = {
    login,
    register,
};