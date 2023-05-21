const router = require('express').Router();

const { getAll } = require('../services/accommodationService');

router.get('/', (req, res) => {
    const rooms = getAll();

    res.render('catalog', {
        title: 'All Accommodation',
        rooms,
    });
}); 

router.get('/:id', (req, res) => {
    res.render('details', { title: 'Accommodation Details' });
}); 

module.exports = router;