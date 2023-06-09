const router = require('express').Router();

const { createFacility, getAllFacilities, updateRoomFacilityRelation } = require('../services/facilityService');
const { getById } = require('../services/roomService');
const { getCheckedFacilitiesForRoomViewData } = require('../viewHelpers/viewHelpers');

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

    const allFacilities = await getAllFacilities();

    const facilities = getCheckedFacilitiesForRoomViewData(room.facilities, allFacilities);
   
    res.render('decorateRoom', {
        title: 'Decorate Room',
        facilities,
        room
    });
});

router.post('/:roomId/decorate-room', async (req, res) => {
    try {
        const facilityIds = Object.keys(req.body);
        const roomId = req.params.roomId;

        await updateRoomFacilityRelation(facilityIds, roomId);

        res.redirect('/catalog/' + roomId);
    } catch (err) {
        console.error(err);
        res.redirect('/404');
    }
});

module.exports = router;