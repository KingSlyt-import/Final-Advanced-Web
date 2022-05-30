// npm module
const jwt = require('jsonwebtoken');
require('dotenv').config();

function readJWT(token) {
    if (!token) {
        return {
            code: 101,
            message: 'Vui lòng cung cấp jwt token hợp lệ'
        };
    }

    const { JWT_SECRET } = process.env;

    let output = {
        code: 101,
        message: 'Vui lòng cung cấp jwt token hợp lệ'
    };

    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) {
            return {
                code: 101,
                message: 'Token không hợp lệ hoặc đã hết hạn'
            };
        }
        output = {
            code: 0,
            ...data
        };
    });

    return output;
}

module.exports = readJWT;