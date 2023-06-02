const router = require('express').Router();

const { create } = require('../services/roomService');

router.get('/', (req, res) => {  // path is defined in index.js
    res.render('create', {
        title: 'Host New Accommodation'
    });
});

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);

        res.redirect('/catalog/' + result._id);
    } catch (err) {
        res.render('create', {
            error: err.message.split('\n')
        });
    }
});

module.exports = router;