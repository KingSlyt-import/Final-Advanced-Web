const { check } = require('express-validator');

module.exports = [
    check('name')
    .exists().withMessage('Vui lòng nhập tên')
    .notEmpty().withMessage('Tên không được để trống')
    .isLength({ min: 6 }).withMessage('Tên người dùng phải ít nhất 6 ký tự'),

    check('email')
    .exists().withMessage('Vui lòng nhập email')
    .notEmpty().withMessage('Email không được để trống')
    .isEmail().withMessage('Email không hợp lệ'),

    check('phone')
    .exists().withMessage('Vui lòng nhập số điện thoại')
    .notEmpty().withMessage('Số điện thoại không được để trống')
    .isLength({ min: 10 }).withMessage('Số điện thoại phải có ít nhất 10 số'),

    check('birthDate')
    .exists().withMessage('Vui lòng nhập ngày tháng năm sinh')
    .notEmpty().withMessage('Ngày tháng năm sinh không được để trống'),

    check('address')
    .exists().withMessage('Vui lòng nhập địa chỉ')
    .notEmpty().withMessage('Địa chỉ không được để trống'),

    check('idCardFront')
    .exists().withMessage('Vui lòng cung cấp ảnh mặt trước CMND/CCCD')
    .notEmpty().withMessage('Ảnh mặt trước CMND/CCCD không được để trống'),

    check('idCardBack')
    .exists().withMessage('Vui lòng cung cấp ảnh mặt sau CMND/CCCD')
    .notEmpty().withMessage('Ảnh mặt sau CMND/CCCD không được để trống'),

    check('')
]