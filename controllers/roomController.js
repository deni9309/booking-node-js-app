const { getByIdWithFacilities, update } = require('../services/roomService');

const router = require('express').Router();

router.get('/:id/edit', async (req, res) => {
    try {
        const room = await getByIdWithFacilities(req.params.id);

        res.render('edit', {
            title: 'Edit Accommodation',
            room,
        });
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

router.post('/:id/edit', async (req, res) => {
    const roomId = req.params.id;
    try {
        const result = await update(roomId, req.body);

        res.redirect('/catalog/' + result._id);
    } catch (err) {
        req.body._id = roomId;

        console.log(err.message);
        res.render('edit', {
            title: 'Edit Accommodation',
            error: err.message.split('\n'),
            room: req.body,
        });
    };
});

module.exports = router;