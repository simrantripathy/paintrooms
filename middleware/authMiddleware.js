const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //checking json web token exists and verified
    if (token) {
        jwt.verify(token, 'pam jim', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}

//checking user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'pam jim', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next(); 
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };