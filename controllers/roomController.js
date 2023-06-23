const router = require('express').Router();

const { isAuth } = require('../middlewares/guards');
const { message } = require('../config/constants');
const { getByIdWithFacilities, update, isUserRoomOwner, getById, deleteRoom } = require('../services/roomService');

router.get('/:id/edit', isAuth, async (req, res) => {
    try {
        const room = await getByIdWithFacilities(req.params.id);

        if (!(await isUserRoomOwner(room._id, req.user._id))) {
            console.log(message.unauthorized);
            return res.status(403).render('404', { error: message.unauthorized });
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
            console.log(message.unauthorized);
            return res.status(403).render('404', { error: message.unauthorized });
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

router.get('/:id/delete', isAuth, async (req, res) => {
    try {
        const room = await getById(req.params.id);

        if (!(await isUserRoomOwner(req.params.id, req.user._id))) {
            console.log(message.unauthorized);
            return res.status(403).render('404', { error: message.unauthorized });
        }

        res.render('delete', {
            title: 'Delete Room',
            room
        })
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

router.post('/:id/delete', isAuth, async (req, res) => {
    if (!(await isUserRoomOwner(req.params.id, req.user._id))) {
        console.log(message.unauthorized);
        return res.status(403).render('404', { error: message.unauthorized });
    }

    try {
        await deleteRoom(req.params.id);

        res.redirect('/catalog');
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

module.exports = router;