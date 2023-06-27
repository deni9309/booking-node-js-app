const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const { extractErrors } = require('../utils/errorHelpers');
const { login, register } = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login',
    body('username').trim()
        .notEmpty().withMessage('Username is required!'),
    body('password').trim()
        .notEmpty().withMessage('Password is required!'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const result = await login(req.body.username, req.body.password);
            if (!result) {
                return res.redirect('/404');
            }

            attachToken(req, res, result);

            res.redirect('/');
        } catch (error) {
            res.render('login', {
                title: 'Login',
                error: extractErrors(error),
                username: req.body.username,
            });
        }
    });

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register',
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required!').bail()
        .isAlphanumeric().withMessage('Username must contain only latin letters and numbers!'),
    body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long!'),
    body('repeatPassword')
        .trim()
        .custom(async (value, { req }) => {  //must throw otherwise the async function will return promise which is a truthy value
            if (value != req.body.password)
                throw new Error('Passwords don\'t  match!');
        }),
    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                throw errors;
            }

            const result = await register(req.body.username, req.body.password);
            attachToken(req, res, result);

            res.redirect('/');
        } catch (error) {
            res.render('register', {
                title: 'Register',
                error: extractErrors(error),
                username: req.body.username,
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
