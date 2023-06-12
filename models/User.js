const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    value: { type: String, enum: ['user', 'admin'], required: true, default: ['user'] }
});

const userSchema = new Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    roles: { type: [String], enum: ['user', 'admin'], default: ['user'] }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;
