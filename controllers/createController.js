const router = require('express').Router();

const { create } = require('../services/accommodationService');

router.get('/', (req, res) => {  // path is defined in index.js
    res.render('create', {
        title: 'Host New Accommodation'
    });
});

router.post('/', async (req, res) => {
    try {
        //simulate error
        //throw new Error('There was an error while processing the request!');

        const result = await create(req.body);

        res.redirect('/catalog/' + result.id);
    } catch (err) {
        res.render('create', {
            error: err.message.split('\n')
        });
    }
});

module.exports = router;