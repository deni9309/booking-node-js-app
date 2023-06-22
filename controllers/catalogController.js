const router = require('express').Router();

const { getAll, getByIdWithFacilities } = require('../services/roomService');

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const city = req.query.city || '';
    const fromPrice = Number(req.query.fromPrice) || 20;
    const toPrice = Number(req.query.toPrice) || 1000;
    try {
        const rooms = await getAll(search, city, fromPrice, toPrice);

        res.render('catalog', {
            title: 'All Accommodation',
            rooms,
            search,
            city,
            fromPrice,
            toPrice
        });
    } catch (err) {
        console.log(err.message);
        res.redirect(404, '/404');
    }
});

router.get('/:id', async (req, res) => {
    let isOwner = false;
    const roomId = req.params.id;
    const room = await getByIdWithFacilities(roomId);

    if (room) {
        // const roomFacilities = Array.from(room.facilities.split(',' || ', '));
        // const hasFacilities = room.facilities?.length > 0;
        if (req.user && room.owner == req.user._id) {
            isOwner = true;
        }

        res.render('details', {
            title: 'Accommodation Details',
            room,
            // hasFacilities,
            // roomFacilities,
            isOwner,
        });
    } else {
        res.render('roomNotFound', {
            title: 'Accommodation Details',
            roomId,
        });
    }
});

module.exports = router;