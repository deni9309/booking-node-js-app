/* Create room controller */

const router = require('express').Router();

const { isAuth } = require('../middlewares/guards');
const { create } = require('../services/roomService');

router.get('/', isAuth, async (req, res) => {  // path is defined in index.js
    res.render('create', {
        title: 'Host New Accommodation',     
    });
});

router.post('/', isAuth, async (req, res) => {
    const roomData = req.body;
    try {
        const result = await create(roomData, req.user._id);
    
        res.redirect('/catalog/' + result._id);
    } catch (err) {
        console.log(err.message);
        res.render('create', {
            title: 'Host New Accommodation',
            error: err.message.split('\n'),
            ...roomData
        });
    };

});

module.exports = router;