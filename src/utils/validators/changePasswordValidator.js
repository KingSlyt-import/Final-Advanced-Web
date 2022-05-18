const { check } = require('express-validator');

module.exports = [
    check('oldPassword')
    .exists().withMessage('Vui lòng nhập mật khẩu')
    .notEmpty().withMessage('Không được để trống mật khẩu')
    .isLength({ min: 6 }).withMessage('Mật khẩu ít nhất 6 ký tự'),

    check('newPassword')
    .exists().withMessage('Vui lòng nhập mật khẩu mới')
    .notEmpty().withMessage('Không được để trống mật khẩu mới')
    .isLength({ min: 6 }).withMessage('Mật khẩu mới ít nhất 6 ký tự'),

    check('confirmPassword')
    .exists().withMessage('Vui lòng nhập mật khẩu xác nhận')
    .notEmpty().withMessage('Không được để trống mật khẩu xác nhận')
    .isLength({ min: 6 }).withMessage('Mật khẩu xác nhận ít nhất 6 ký tự')
    .custom((confirmPassword, { req }) => {
        const newPassword = req.body.newPassword
        if (newPassword !== confirmPassword) {
            throw new Error('Mật khẩu xác nhận không trùng khớp')
        } else {
            return true;
        }
    })
]