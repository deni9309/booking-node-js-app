const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const { isAuth, hasRole } = require('../middlewares/guards');
const { createFacility, getAllFacilities, updateRoomFacilityRelation } = require('../services/facilityService');
const { getById } = require('../services/roomService');
const { extractErrors } = require('../utils/errorHelpers');
const { getCheckedFacilitiesForRoomViewData } = require('../viewHelpers/viewHelpers');

router.get('/create', hasRole('admin'), (req, res) => {

    res.render('createFacility', {
        title: 'Create New Facility',
    });
});

router.post('/create', hasRole('admin'),
    body('label')
        .trim()
        .notEmpty().withMessage('Label is required'),
    body('iconUrl').trim(),
    async (req, res) => {
        const { label, iconUrl } = req.body;
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await createFacility(label, iconUrl);

            res.redirect('/catalog');
        } catch (error) {
            res.render('createFacility', {
                title: 'Create New Facility',
                error: extractErrors(error),
                ...req.body
            });
        }
    });

router.get('/:roomId/decorate-room', isAuth, async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);

    try {
        const allFacilities = await getAllFacilities();

        const facilities = getCheckedFacilitiesForRoomViewData(room.facilities, allFacilities);

        res.render('decorateRoom', {
            title: 'Decorate Room',
            facilities,
            room
        });
    } catch (err) {
        console.log(err.message);
        res.redirect(404, '/404');
    }
});

router.post('/:roomId/decorate-room', isAuth, async (req, res) => {
    try {
        const facilityIds = Object.keys(req.body);
        const roomId = req.params.roomId;

        await updateRoomFacilityRelation(facilityIds, roomId);

        res.redirect('/catalog/' + roomId);
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

module.exports = router;