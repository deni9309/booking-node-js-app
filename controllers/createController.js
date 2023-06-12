const router = require('express').Router();

const { create } = require('../services/roomService');

router.get('/', async (req, res) => {  // path is defined in index.js

    res.render('create', {
        title: 'Host New Accommodation',     
    });
});

router.post('/', async (req, res) => {
    try {
        const roomData = req.body;
        const result = await create(roomData, req.user._id);
    
        res.redirect('/catalog/' + result._id);
    } catch (err) {
        console.error(err);

        res.render('create', {
            title: 'Host New Accommodation',
            error: err.message.split('\n')
        });
    };

});

module.exports = router;