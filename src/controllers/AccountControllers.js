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
                const emailData = {
                    subject: '[SPACE HOLIC] Mật khẩu và tài khoản đăng nhập của hệ thống SPACE HOLIC',
                    toEmail: email,
                    username: name,
                    password
                }

                emailer.sendEmail(emailData)
                    .then(() => {
                        console.log('Gửi email xác nhận thành công');
                    })
                    .catch(e => {
                        if (!emailerResult) {
                            throw new Error('Gửi mail xác nhận thất bại');
                        }
                    })
            })
            .then(() => {
                return res.json({
                    code: 0,
                    message: 'Đăng ký tài khoản thành công',
                    data: user
                })
            })
            .catch(e => {
                return res.json({
                    code: 0,
                    message: 'Đăng ký tài khoản thất bại: ' + e.message
                })
            });
    };

    // [GET] /api/accounts/profile/:email
    async getProfile(req, res) {
        const { email } = req.params;
        const userData = await AccountModel.findOne({ email });
        if (!userData) {
            return res.json({
                code: 3,
                message: 'Không tìm thấy tài khoản'
            });
        }

        const data = {
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            birthDate: userData.birthDate,
            address: userData.address,
            role: userData.role,
            status: userData.status,
            money: userData.money,
            tradeCount: userData.tradeCount,
        }

        return res.json({
            code: 0,
            message: 'Nhận thông tin người dùng thành công',
            data
        });
    };
}

module.exports = new AccountControllers();