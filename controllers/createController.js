const router = require('express').Router();

router.get('/', (req, res) => {  // path is defined in index.js
    res.render('create', {
        title: 'Host New Accommodation'
    });
});

module.exports = router;