const jwt = require('jsonwebtoken');

module.exports = (secret) => (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const data = jwt.verify(token, secret);
            req.user = data;
            
        } catch (err) {
            res.clearCookie('jwt'); //res.cookie('jwt', '', { maxAge: 0 });
            
            return res.redirect('/login');
        }
    }

    req.signJwt = (data) => jwt.sign(data, secret, { expiresIn: '4h' });

    next();
};