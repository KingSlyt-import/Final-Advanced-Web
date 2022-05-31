const { check } = require('express-validator');

module.exports = [
    check('otp')
    .exists().withMessage('Vui lòng nhập tên OTP')
    .notEmpty().withMessage('OTP không được để trống')
    .isLength({ min: 6 }).withMessage('OTP không hợp lệ'),

    check('password').exists().withMessage('Vui lòng nhập mật khẩu')
    .notEmpty().withMessage('Mật khẩu không được để trống')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có từ 6 ký tự'),

    check('confirmPassword')
    .exists().withMessage('Vui lòng nhập mật khẩu xác nhận')
    .notEmpty().withMessage('Không được để trống mật khẩu xác nhận')
    .isLength({ min: 6 }).withMessage('Mật khẩu xác nhận ít nhất 6 ký tự')
    .custom((confirmPassword, { req }) => {
        const password = req.body.password
        if (password !== confirmPassword) {
            throw new Error('Mật khẩu xác nhận không trùng khớp')
        } else {
            return true;
        }
    })
]