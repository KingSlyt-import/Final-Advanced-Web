const { check } = require('express-validator');

module.exports = [
    check('email').exists().withMessage('Vui lòng nhập email')
    .notEmpty().withMessage('Email không được để trống')
    .isEmail().withMessage('Email không hợp lệ'),

    check('password').exists().withMessage('Vui lòng nhập mật khẩu')
    .notEmpty().withMessage('Mật khẩu không được để trống')
    .isLength({ min: 8 }).withMessage('Mật khẩu phải có từ 8 ký tự')
]