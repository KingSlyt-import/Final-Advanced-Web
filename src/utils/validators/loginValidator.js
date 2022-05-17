const { check } = require('express-validator');

module.exports = [
    check('username')
    .exists().withMessage('Vui lòng nhập tên người dùng')
    .notEmpty().withMessage('Tên người dùng không được để trống')
    .isLength({ min: 10 }).withMessage('Tên người dùng không hợp lệ'),

    check('password').exists().withMessage('Vui lòng nhập mật khẩu')
    .notEmpty().withMessage('Mật khẩu không được để trống')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có từ 6 ký tự')
]