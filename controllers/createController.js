const router = require('express').Router();

const { create } = require('../services/roomService');
const { getAllFacilities, attachRoomToFacilities } = require('../services/facilityService');

router.get('/', async (req, res) => {  // path is defined in index.js
    const facilities = await getAllFacilities();

    res.render('create', {
        title: 'Host New Accommodation',
        facilities,
    });
});

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);

        try {
            if (result.facilities.length > 0) {
                await attachRoomToFacilities(result.facilities, result._id);
            }

            res.redirect('/catalog/' + result._id);
        } catch (err) {
            throw err;
        }
    } catch (err) {
        res.render('create', {
            title: 'Host New Accommodation',
            facilities,
            error: err.message.split('\n')
        });
    }
});

module.exports = router;