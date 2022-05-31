// core module
const { AccountModel } = require('../../repository/mongo/models/Account');
const saveIdCard = require('../../utils/util/saveIdCard');
const readJWT = require('../../utils/util/readJWT');
const emailer = require('../../utils/email/index');

// npm module
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const { validationResult } = require('express-validator');

const port = process.env.PORT || 3000;

class AccountControllers {
    // [GET] /api/accounts/
    getAccountController(req, res) {
        return res.json({
            code: 0,
            message: 'Account Controller',
        });
    };

    // [POST] /api/accounts/register
    async register(req, res) {
        const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files) => {
            if (err) {
                return res.json({
                    code: 2,
                    message: err
                })
            }

            const result = validationResult(fields);
            if (result.errors.length !== 0) {
                let message = result.errors[0].msg;

                return res.json({
                    code: 2,
                    message
                })
            }

            const { name, email, phone, birthDate, address } = fields;

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

            const { idCardFront, idCardBack } = files;
            const [idCardFrontPath, idCardBackPath] = saveIdCard(userName, idCardFront, idCardBack);

            const user = new AccountModel({
                username: userName,
                password: hashedPassword,
                fullName: name,
                phone,
                email,
                birthDate: new Date(birthDate + 'Z').toISOString(),
                address,
                idCardFront: `/img/users/${userName}/${idCardFrontPath}`,
                idCardBack: `/img/users/${userName}/${idCardBackPath}`
            });

            user.save()
                .then(() => {
                    const emailData = {
                        subject: '[SPACE HOLIC] Mật khẩu và tài khoản hệ thống SPACE HOLIC',
                        toEmail: email,
                        username: userName,
                        password
                    }

                    emailer.sendRegisterEmail(emailData);
                })
                .then(() => {
                    return res.redirect('/user/login');
                })
                .catch(e => {
                    return res.json({
                        code: 0,
                        message: 'Đăng ký tài khoản thất bại: ' + e.message
                    })
                });
        });
    };

    // [POST] /api/accounts/login
    async login(req, res) {
        const result = validationResult(req);
        if (result.errors.length !== 0) {
            let message = result.errors[0].msg;

            return res.json({
                code: 3,
                message
            })
        };

        const { username, password } = req.body;
        const user = await AccountModel.findOne({ username });

        // Username không tồn tại
        if (!user) {
            return res.json({
                code: 3,
                message: 'Tài khoản không tồn tại'
            });
        };

        // Tài khoản bị khóa 
        if (user.status === 'disabled') {
            return res.json({
                code: 3,
                message: 'Tài khoản đã bị khóa do nhập sai mật khẩu nhiều lần, vui lòng liên hệ quản trị viên để được hỗ trợ'
            });
        };

        // Tài khoản không bị khóa nhưng có đánh dấu đăng nhập bất thường
        if (user.status !== 'disabled' && user.loginAttempt.penalty === true) {
            let timeLeft = Date.now() - user.loginAttempt.lastTime;
            if (timeLeft <= 60000) {
                return res.json({
                    code: 2,
                    message: 'Tài khoản hiện tại đang bị tạm khóa, vui lòng thử lại sau 1 phút'
                });
            }
        };

        const passwordMatch = bcrypt.compareSync(password, user.password);
        let dataUpdate = undefined;

        // Nếu mật khẩu không chính xác
        if (!passwordMatch) {
            // Nếu người dùng là admin thì không cần xử lý "Đăng nhập bất thường"
            if (user.role === 'admin') {
                return res.json({
                    code: 3,
                    message: 'Mật khẩu không chính xác'
                });
            }

            // Nếu số lần đăng nhập bất thường nhỏ hơn 3, cộng số lần đăng nhập bất thường lên 1
            if (user.loginAttempt.count <= 2) {
                dataUpdate = {
                    loginAttempt: {
                        ...user.loginAttempt,
                        count: user.loginAttempt.count + 1
                    }
                }
            } else {
                // Nếu người dùng đã bị đánh dấu đăng nhập bất thường, tài khoản sẽ chuyển sang trạng thái disabled
                if (user.loginAttempt.penalty === true) {
                    dataUpdate = {
                        status: 'disabled'
                    };
                } else { // Không thì cập nhật penalty là true, và update lần đăng nhập đó bằng hàm Date()
                    dataUpdate = {
                        loginAttempt: {
                            count: 0,
                            lastTime: new Date(),
                            penalty: true
                        }
                    }
                }
            }

            // Update dữ liệu đăng nhập bất thường vào database
            AccountModel.findOneAndUpdate({ _id: user._id }, dataUpdate)
                .then(data => {
                    if (!data) {
                        return res.json({
                            code: 2,
                            message: 'Không tìm thấy người dùng'
                        });
                    };

                    return res.json({
                        code: 3,
                        message: 'Mật khẩu hoặc tài khoản không chính xác'
                    });
                }).catch(e => {
                    return res.json({
                        code: 3,
                        message: 'Có lỗi trong quá trình đăng nhập: ' + e.message
                    });
                });
        }

        const { JWT_SECRET } = process.env;
        jwt.sign({
            email: user.email,
            fullName: user.fullName,
            firstLog: user.firstLog,
            role: user.role,
            status: user.status
        }, JWT_SECRET, {
            expiresIn: '1h'
        }, async(error, token) => {
            if (error) throw error;

            dataUpdate = {
                loginAttempt: {
                    count: 0,
                    lastTime: new Date(),
                    penalty: false
                }
            };

            await AccountModel.findByIdAndUpdate({ _id: user._id }, dataUpdate);

            return res.status(200).json({
                code: 0,
                message: 'Đăng nhập thành công',
                token
            });
        });
    };

    // [GET] /api/accounts/get-all-user
    async getAllUser(req, res) {
        const data = await AccountModel.find({});

        if (!data) {
            return res.json({
                code: 3,
                message: 'Không tìm thấy người dùng nào'
            })
        };

        return res.json({
            code: 0,
            message: 'Nhận dữ liệu thành công',
            data
        });
    };

    // [GET] /api/accounts/get-user-by-email
    async getUserByEmail(req, res) {
        const { email } = req.body;
        const data = await AccountModel.find({ email });

        if (!data) {
            return res.json({
                code: 3,
                message: 'Không tìm thấy người dùng'
            })
        };

        return res.json({
            code: 0,
            message: 'Nhận dữ liệu của người dùng thành công',
            data
        });
    };

    // [GET] /api/accounts/profile
    async getProfile(req, res) {
        const { email } = req.user;
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
            tradeCount: userData.tradeCount
        }

        return res.json({
            code: 0,
            message: 'Nhận thông tin người dùng thành công',
            data
        });
    };

    // [POST] /api/accounts/change-password
    async changePassword(req, res) {
        const result = validationResult(req);
        if (result.errors.length !== 0) {
            let message = result.errors[0].msg;

            return res.json({
                code: 2,
                message
            })
        }

        const { oldPassword, newPassword } = req.body
        const { email } = req.user;
        const userData = await AccountModel.findOne({ email });
        if (!userData) {
            return res.json({
                code: 3,
                message: 'Không tìm thấy tài khoản'
            });
        }

        const isMatch = bcrypt.compareSync(oldPassword, userData.password);
        if (!isMatch) {
            return res.json({
                code: 3,
                message: 'Mật khẩu cũ không đúng'
            });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        await AccountModel.findOneAndUpdate({ email }, { password: hashedPassword });

        return res.json({
            code: 0,
            message: 'Đổi mật khẩu thành công'
        });
    };

    // [POST] /api/accounts/send-otp
    async sendOTP(req, res) {
        const result = validationResult(req);
        if (result.errors.length !== 0) {
            let message = result.errors[0].msg;

            return res.json({
                code: 3,
                message
            })
        };

        const { email } = req.body;
        const user = await AccountModel.findOne({ email });

        if (user) {
            const { JWT_SECRET } = process.env;

            const otpCode = (Math.floor(100000 + Math.random() * 900000)).toString();

            jwt.sign({
                otpCode,
                email
            }, JWT_SECRET, {
                expiresIn: '10m'
            }, async(error, token) => {
                if (error) throw error;

                const emailData = {
                    subject: '[SPACE HOLIC] Thông tin khôi phục mật khẩu hệ thống SPACE HOLIC',
                    toEmail: email,
                    otp: otpCode,
                    link: `http://localhost:${port}/user/recover-password/${token}`
                }

                emailer.sendRecoverPasswordEmail(emailData);

                const dataUpdate = {
                    otp: {
                        code: otpCode,
                        lastTime: new Date()
                    }
                }

                await AccountModel.findOneAndUpdate({ email }, dataUpdate);
            });
        }

        return res.json({
            code: 0,
            message: 'Đã gửi thông tin khôi phục mật khẩu đến mail của bạn',
        });
    };

    async recoverPassword(req, res) {
        const result = validationResult(req);
        if (result.errors.length !== 0) {
            let message = result.errors[0].msg;

            return res.json({
                code: 3,
                message
            })
        };

        const { otp, password } = req.body;
        const { token } = req.params;

        const data = readJWT(token);
        const user = await AccountModel.findOne({ email: data.email });
        const timeLeft = Date.now() - user.otp.lastTime;

        if ((user.otp.code).toString() === otp) {
            if (timeLeft < 60000) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                await AccountModel.findOneAndUpdate({ email: data.email }, { password: hashedPassword });

                return res.json({
                    code: 0,
                    message: 'Đổi mật khẩu thành công'
                })
            } else {
                return res.json({
                    code: 3,
                    message: 'OTP quá hạn'
                })
            }
        } else {
            return res.json({
                code: 3,
                message: 'OTP quá hạn hoặc OTP không chính xác'
            })
        }
    }
};

module.exports = new AccountControllers();