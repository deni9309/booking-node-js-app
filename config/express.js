const express = require('express');
const hbs = require('express-handlebars').create({ extname: 'hbs' });
const cookieParser = require('cookie-parser');

const defaultTitle = require('../middlewares/defaultTitle');
const auth = require('../middlewares/auth');
const userNav = require('../middlewares/userNav');

const SECRET = 'xc7MNB709tjfi7t7gug85A5%3evvhcj#.#fbshd.DA99';

module.exports = (app) => {
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: false }));  // body parser middleware
    app.use('/static', express.static('static'));
    app.use(cookieParser()); // cookie-parser must be before auth (auth uses it)
    app.use(auth(SECRET));
    app.use(userNav());  // middleware that checks if there is user logged in or not

    app.use(defaultTitle('BooKing'));
};
