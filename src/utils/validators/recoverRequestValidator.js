const { check } = require('express-validator');

module.exports = [
    check('email')
    .exists().withMessage('Vui lòng nhập email')
    .notEmpty().withMessage('Email không được để trống')
    .isEmail().withMessage('Email không hợp lệ'),

    check('phone')
    .exists().withMessage('Vui lòng nhập số điện thoại')
    .notEmpty().withMessage('Số điện thoại không được để trống')
    .isLength({ min: 10 }).withMessage('Số điện thoại phải có ít nhất 10 số'),
]