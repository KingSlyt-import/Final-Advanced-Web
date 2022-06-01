// core module
require('dotenv').config();

// npm module
const fetch = require('node-fetch');
const readJWT = require('../../utils/util/readJWT');

const port = process.env.PORT || 3000;

class UserController {
    // [GET] /user/login
    login(req, res) {
        let message = req.flash('message')[0]
        res.render('login', { message });
    };

    // [POST] /user/login-process
    loginProcess(req, res) {
        fetch(`http://localhost:${port}/api/accounts/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: req.body.username,
                    password: req.body.password
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    // return res.json({
                    //     code: 1,
                    //     message: response.message,
                    // });
                    req.flash('message', response.message);
                    res.redirect('/user/login');
                } else {
                    req.flash('message', 'Đăng nhập thành công');
                    res.redirect(`/index/${response.token}`);
                }
            })
    }

    // [POST] /users/firstChangePassword/:token
    firstLogProcess(req, res) {
        const token = req.params.token;
        fetch(`http://localhost:${port}/api/accounts/first-log-process`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    newPassword: req.body.newPassword,
                    confirmPassword: req.body.confirmPassword
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    return res.json({
                        code: 1,
                        message: response.message,
                    });
                } else {
                    res.redirect(`/index/${token}`);
                }
            })
    }

    // [GET] /user/register
    register(req, res) {
        res.render('register');
    }

    // [POST] register-process
    registerProcess(req, res) {
        fetch(`http://localhost:${port}/api/accounts/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address,
                    birthDate: req.body.birthDate,
                    idCardFront: req.body.idCardFront,
                    idCardBack: req.body.idCardBack
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    return res.json({
                        code: 1,
                        message: 'Đăng nhập thất bại',
                    });
                } else {
                    res.redirect('/index');
                }
            })
    }

    // [GET] /user/recovery-pass
    recoveryPass(req, res) {
        res.render('recoveryPass_email');
    }

    // [POST] /user/recovery-pass-process
    recoveryPassProcess(req, res) {
        fetch(`http://localhost:${port}/api/accounts/send-otp`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: req.body.email,
                    phone: req.body.phone
                })
            })
            .then(response => response.json())
            .then(response => res.redirect('/'))
    }

    // [GET] /user/recover-password/:token
    recoverPassword(req, res) {
        const { token } = req.params;
        res.render('OTP_Recovery', { token });
    }

    // [POST] /user/recover-password
    recoverPasswordProcess(req, res) {
        const { token } = req.params;
        fetch(`http://localhost:${port}/api/accounts/recover-password/${token}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp: req.body.otp,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    return res.json({
                        code: 3,
                        message: response.message
                    })
                } else {
                    return res.redirect('/user/login');
                }
            })
    }

    // [GET] /user/deposit
    deposit(req, res) {
        const { token } = req.params;
        const data = readJWT(token);
        fetch(`http://localhost:${port}/api/accounts/profile`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(response => {
                res.render('deposit', {
                    data,
                    token
                });
            });
    }

    // [POST] /user/deposit-process
    depositProcess(req, res) {
        const { token } = req.params;
        const data = readJWT(token);
        fetch(`http://localhost:${port}/api/wallet/top-up`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    cardId: req.body.cardId,
                    cvv: req.body.cvv,
                    expiredDate: req.body.expiredDate,
                    amount: req.body.amount
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    return res.json({
                        code: 3,
                        message: response.message
                    });
                } else {
                    res.redirect(`/user/deposit/${token}`);
                }
            })
    }

    // [GET] /user/transfer
    transfer(req, res) {
        res.render('transfer');
    }

    // [GET] /user/drawback
    drawback(req, res) {
        res.render('drawback');
    }

    // [GET] /user/mobile-card
    mobileCard(req, res) {
        res.render('mobileCard');
    }

    // [GET] /user/trade
    trade(req, res) {
        res.render('trade');
    }

    // [GET] /user/information/:token
    information(req, res) {
        const { token } = req.params;
        fetch(`http://localhost:${port}/api/accounts/profile`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    return res.json({
                        code: 1,
                        message: 'Lấy thông tin người dùng thất bại',
                    });
                } else {
                    res.render('info', {
                        data: response.data,
                        token
                    });
                }
            });
    }

    // [GET] /user/change-pass
    changePass(req, res) {
        const { token } = req.params;
        const data = readJWT(token);
        fetch(`http://localhost:${port}/api/accounts/profile`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(response => {
                res.render('doimk', {
                    data,
                    token
                });
            });
    }

    // [POST] /user/change-pass
    changePassProcess(req, res) {
        const { token } = req.params;
        fetch(`http://localhost:${port}/api/accounts/change-password`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    oldPassword: req.body.oldPassword,
                    newPassword: req.body.newPassword,
                    confirmPassword: req.body.confirmPassword
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    return res.json({
                        code: 3,
                        message: response.message
                    });
                } else {
                    res.redirect(`/index/${token}`);
                }
            })
    }

    // // [GET] /user/add-id-card
    // addIDCard(req, res) {
    //     const { token } = req.params;
    //     const data = readJWT(token);
    //     fetch(`http://localhost:${port}/api/accounts/profile`, {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(response => {
    //             res.render('bosungCMND2', {
    //                 data,
    //                 token
    //             });
    //         });
    // }

    // // [POST] /user/add-id-card
    // changePassProcess(req,res){
    //     fetch(`http://localhost:${port}/api/accounts/change-password`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 oldPassword: req.body.oldPassword,
    //                 newPassword: req.body.newPassword,
    //             })
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.code !== 0) {
    //                 return res.json({
    //                     code: 3,
    //                     message: 'Mật khẩu cũ không đúng',
    //                 });
    //             } else {
    //                 res.redirect(`/index/${token}`);
    //             }
    //         })
    // }

    // [GET] /user/add-id-card
    mobileInfo(req, res) {
        res.render('mobileCard_info');
    }

    // [GET] /user/add-id-card
    contactLogined(req, res) {
        const { token } = req.params;
        const data = readJWT(token);
        fetch(`http://localhost:${port}/api/accounts/profile`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(response => {
                res.render('contact_logined', {
                    data,
                    token
                });
            });
    }

    // [GET] /user/add-id-card
    OTP(req, res) {
        res.render('OTP_Recovery');
    }

    // [GET] /user/detail-trade
    detailedTrade(req, res) {
        res.render('hoadoninfo');
    }
}

module.exports = new UserController();