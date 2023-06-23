const router = require('express').Router();

const { isAuth } = require('../middlewares/guards');
const { getByIdWithFacilities, update, isUserRoomOwner } = require('../services/roomService');

router.get('/:id/edit', isAuth, async (req, res) => {
    try {
        const room = await getByIdWithFacilities(req.params.id);

        if (!(await isUserRoomOwner(room._id, req.user._id))) {
            console.log('Unauthorized attempt to modify room resource!');

            return res.status(403).render('404', {
                error: 'Error 403 - Unauthorized attempt to modify room resource!'
            });
        }

        res.render('edit', {
            title: 'Edit Accommodation',
            room,
        });
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

router.post('/:id/edit', isAuth, async (req, res) => {
    const roomId = req.params.id;

    try {
        if (!(await isUserRoomOwner(roomId, req.user._id))) {
            console.log('Unauthorized attempt to modify room resource!');

            return res.status(403).render('404', {
                error: 'Error 403 - Unauthorized attempt to modify room resource!'
            });
        }

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