const { check } = require('express-validator');

module.exports = [
    check('cardId')
    .exists().withMessage('Vui lòng nhập mã số thẻ')
    .notEmpty().withMessage('Không được để trống mã số thẻ')
    .isLength({ min: 6 }).withMessage('Mã số thẻ ít nhất 6 ký tự'),

    check('cvv')
    .exists().withMessage('Vui lòng nhập CVV')
    .notEmpty().withMessage('Không được để trống CVV')
    .isLength({ max: 3 }).withMessage('CVV có nhiều nhất 3 ký tự'),

    check('expiredDate')
    .exists().withMessage('Vui lòng nhập ngày hết hạn của thẻ')
    .notEmpty().withMessage('Không được để trống ngày hết hạn của thẻ'),

    check('amount')
    .exists().withMessage('Vui lòng nhập số tiền cần chuyển')
    .notEmpty().withMessage('Không được để số tiền cần chuyển')
    .isNumeric().withMessage('Số tiền cần chuyển không hợp lệ'),

]