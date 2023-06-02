const router = require('express').Router();

const { getAll, getById } = require('../services/roomService');

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const city = req.query.city || '';
    const fromPrice = Number(req.query.fromPrice) || 20;
    const toPrice = Number(req.query.toPrice) || 1000;

    const rooms = await getAll(search, city, fromPrice, toPrice);

    res.render('catalog', {
        title: 'All Accommodation',
        rooms,
        search,
        city,
        fromPrice,
        toPrice
    });
});

router.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if (room) {
        const roomFacilities = Array.from(room.facilities.split(',' || ', '));

        res.render('details', {
            title: 'Accommodation Details',
            room,
            roomFacilities
        });
    } else {
        res.render('roomNotFound', {
            title: 'Accommodation Details',
            roomId
        });
    }
});

module.exports = router;