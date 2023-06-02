const express = require('express');
const hbs = require('express-handlebars').create({ extname: 'hbs' });

const defaultTitle = require('../middlewares/defaultTitle');

module.exports = (app) => {
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: false }));  // body parser middleware
    app.use('/static', express.static('static'));

    app.use(defaultTitle('BooKing'));
};
