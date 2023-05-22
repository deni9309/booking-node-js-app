const router = require('express').Router();

const { getAll, getById } = require('../services/accommodationService');

router.get('/', (req, res) => {
    const rooms = getAll();

    res.render('catalog', {
        title: 'All Accommodation',
        rooms
    });
});

router.get('/:id', (req, res) => {
    const roomId = req.params.id;
    const room = getById(roomId);

    if (room) {
        res.render('details', {
            title: 'Accommodation Details',
            room
        });
    } else {
        res.render('roomNotFound', {
            title: 'Accommodation Details',
            roomId
        });
    }
});

module.exports = router;