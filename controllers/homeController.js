const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Home'});
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About BooKing' });
});

module.exports = router;
