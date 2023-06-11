const router = require('express').Router();

const { getAll, getByIdWithFacilities } = require('../services/roomService');

router.get('/', async (req, res) => {
    const user = req.user;
    console.log(user);

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
    const room = await getByIdWithFacilities(roomId);

    if (room) {
        //  const roomFacilities = Array.from(room.facilities.split(',' || ', '));
        //   const hasFacilities = room.facilities?.length > 0;
        res.render('details', {
            title: 'Accommodation Details',
            // hasFacilities,
            room
            //  roomFacilities
        });
    } else {
        res.render('roomNotFound', {
            title: 'Accommodation Details',
            roomId
        });
    }
});

module.exports = router;