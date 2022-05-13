const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization) {
        return res.status(401).json({
            code: 101,
            message: 'Please provide JWT token inside header'
        })
    }

    let token = authorization.split(' ')[1];
    const { JWT_SECRET } = process.env;

    if (!token) {
        return res.status(401).json({
            code: 101,
            message: 'Please provide valid JWT token'
        })
    }

    jwt.verify(token, JWT_SECRET, (error, data) => {
        if (error) {
            return res.status(401).json({
                code: 101,
                message: 'Token invalid or expired: ' + error.message
            })
        }

        req.user = data;
        next();
    })
}