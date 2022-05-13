// core module
const { UserModel, AccountModel } = require('../repository/mongo/models/User');
const emailer = require('../utils/email/index');

// npm module
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

class AccountControllers {
    // [GET] /api/accounts/
    getAccountController(req, res) {
        return res.json({
            code: 0,
            message: 'Account Controller',
            data: req.user
        });
    };

    // [GET] /api/accounts/get-all-user
    async getAllUser(req, res) {
        const data = await UserModel.find();

        if (!data) {
            return res.json({
                code: 3,
                message: 'No data available'
            })
        };

        return res.json({
            code: 0,
            message: 'Get all user successfully',
            data
        });
    };

    // [GET] /api/accounts/register
    async register(req, res) {
        const result = validationResult(req);
        if (result.errors.length !== 0) {
            let message = result.errors[0].msg;

            return res.json({
                code: 0,
                message
            })
        }

        const { name, email, phone, birthDate, address, idCardFront, idCardBack } = req.body;

        const checkEmailExists = await AccountModel.findOne({ email });
        if (checkEmailExists) {
            return res.json({
                code: 3,
                message: 'Email đã tồn tại'
            });
        };
        const checkPhoneExists = await AccountModel.findOne({ phone });
        if (checkPhoneExists) {
            return res.json({
                code: 3,
                message: 'Số điện thoại đã tồn tại'
            });
        };

        const userName = (Math.floor(1000000000 + Math.random() * 9999999999)).toString();
        const password = (Math.random().toString(36).substring(2, 8)).toString();
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new AccountModel({
            username: userName,
            password: hashedPassword,
            fullName: name,
            phone,
            email,
            birthDate,
            address,
            idCardFront,
            idCardBack
        });

        user.save()
            .then(() => {
                return res.json({
                    code: 0,
                    message: 'Đăng ký tài khoản thành công',
                    data: user
                })
            })
            .then(() => {
                const emailData = {
                    subject: '[SPACE HOLIC] Mật khẩu và tài khoản đăng nhập của hệ thống SPACE HOLIC',
                    toEmail: email,
                    username,
                    password
                }

                const emailerResult = emailer.sendEmail(emailData);
                if (emailerResult) {
                    console.log(emailerResult);
                } else {
                    console.log('Lỗi khi gửi email xác nhận');
                }
            })
            .catch(e => {
                return res.json({
                    code: 0,
                    message: 'Đăng ký tài khoản thất bại: ' + e.message
                })
            });
    }
};

module.exports = new AccountControllers();