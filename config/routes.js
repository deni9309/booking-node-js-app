const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const createController = require('../controllers/createController');
const defaultController = require('../controllers/defaultController');
const facilityController = require('../controllers/facilityController');
const authController = require('../controllers/authController');
const roomController = require('../controllers/roomController');

const { hasUser, isGuest } = require('../middlewares/guards');


module.exports = (app) => {
    app.use(homeController);
    app.use('/catalog', catalogController);
    app.use('/create', hasUser(), createController);
    app.use('/facility', facilityController);
    app.use('/auth', authController);  // isGuest()
    app.use('/room', roomController);
    // attach other controllers

    app.all('*', defaultController);
};
