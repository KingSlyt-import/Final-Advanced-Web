const { check } = require('express-validator');

module.exports = [
    check('oldPassword')
    .exists().withMessage('Vui lòng nhập Password')
    .notEmpty().withMessage('Không được để trống Password')
    .isLength({ min: 6 }).withMessage('Password từ 6 ký tự'),

    check('newPassword')
    .exists().withMessage('Vui lòng nhập Password mới')
    .notEmpty().withMessage('Không được để trống Password mới')
    .isLength({ min: 6 }).withMessage('Password mới từ 6 ký tự'),

    check('confirmPassword')
    .exists().withMessage('Vui lòng nhập Password xác nhận')
    .notEmpty().withMessage('Không được để trống Password xác nhận')
    .isLength({ min: 6 }).withMessage('Password xác nhận từ 6 ký tự')
    .custom((confirmPassword, { req }) => {
        const newPassword = req.body.newPassword
        if (newPassword !== confirmPassword) {
            throw new Error('Password không trùng khớp')
        } else {
            return true;
        }
    })
]