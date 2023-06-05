const router = require('express').Router();

const { createFacility, getAllFacilities } = require('../services/facilityService');
const { getById } = require('../services/roomService');

router.get('/create', (req, res) => {

    res.render('createFacility', {
        title: 'Create New Facility',
    });
});

router.post('/create', async (req, res) => {
    const { label, iconUrl } = req.body;

    try {
        await createFacility(label, iconUrl);
       
        res.redirect('/catalog');
    } catch (err) {
        res.render('createFacility', {
            title: 'Create New Facility',
            error: err.message.split('\n'),
        });
    }   
});

router.get('/:roomId/decorate-room', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);
    const facilities = await getAllFacilities();

    res.render('decorateRoom', {
        title: 'Decorate Room',
        facilities,
        room
    });
});

module.exports = router;