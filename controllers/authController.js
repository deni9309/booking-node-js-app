const router = require('express').Router();

const { login, register } = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    try {
        if (req.body.username.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        }

        const result = await login(req.body.username.trim(), req.body.password.trim());
        attachToken(req, res, result);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('login', {
            title: 'Login',
            error: err.message.split('\n')
        });
    }
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
    try {
        if (req.body.username.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        }
        if (req.body.password.trim() != req.body.repeatPassword.trim()) {
            throw new Error('Passwords don\'t  match!');
        }

        const result = await register(req.body.username.trim(), req.body.password.trim());
        attachToken(req, res, result);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('register', {
            title: 'Register',
            error: err.message.split('\n')
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwt');

    return res.redirect('/');
});
    
function attachToken(req, res, data) {
    const token = req.signJwt(data);

    res.cookie('jwt', token, { maxAge: 14400000 });
}

module.exports = router;
