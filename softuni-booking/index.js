const express = require('express');
const hbs = require('express-handlebars').create({ extname: 'hbs' });

const homeController = require('./controllers/homeController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');
const defaultController = require('./controllers/defaultController');
const defaultTitle = require('./middlewares/defaultTitle');

const app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));  // body parser middleware
app.use('/static', express.static('static'));

app.use(defaultTitle('BooKing'));

app.use(homeController);
app.use('/catalog', catalogController);
app.use('/create', createController);
// attach other controllers

app.all('*', defaultController);

app.listen(5000, () => console.log('Server is running on port 5000...'));