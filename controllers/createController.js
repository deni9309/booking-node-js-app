/* Create room controller */

const router = require('express').Router();
const { body } = require('express-validator');

const { isAuth } = require('../middlewares/guards');
const { extractErrors } = require('../utils/errorHelpers');
const { create } = require('../services/roomService');

router.get('/', isAuth, async (req, res) => {  // path is defined in index.js
    res.render('create', {
        title: 'Host New Accommodation',
    });
});

router.post('/', isAuth,
    body('description').trim(),
    async (req, res) => {
        const roomData = req.body;
        try {
            const result = await create(roomData, req.user._id);

            res.redirect('/catalog/' + result._id);
        } catch (error) {
            res.render('create', {
                title: 'Host New Accommodation',
                error: extractErrors(error),
                ...roomData
            });
        };

    });

module.exports = router;