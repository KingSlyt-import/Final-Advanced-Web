// core module
require('dotenv').config();

// npm module
const fetch = require('node-fetch');

const port = process.env.PORT || 3000;

class UserController {
    // [GET] /user/login
    login(req, res) {
        res.render('login');
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
            .then(data => {
                if (data.code !== 0) {
                    return res.json({
                        code: 1,
                        message: 'Đăng nhập thất bại',
                    });
                } else {
                    res.redirect('/index');
                }
            })
    }

    // [GET] /user/register
    register(req, res) {
        res.render('register');
    }

    // [GET] /user/recovery-pass
    recoveryPass(req, res) {
        res.render('recoveryPass_email');
    }

    // [GET] /user/deposit
    deposit(req, res) {
        res.render('deposit');
    }

    // [GET] /user/transfer
    transfer(req, res) {
        res.render('transfer');
    }

    // [GET] /user/drawback
    drawback(req, res) {
        res.render('drawback');
    }

    // [GET] /user/
    mobileCard(req, res) {
        res.render('mobileCard');
    }

    trade(req, res) {
        res.render('trade');
    }

    information(req, res) {
        res.render('info')
    }

    changePass(req, res) {
        res.render('doimk');
    }

    addIDCard(req, res) {
        res.render('bosungCMND2');
    }

    mobileInfo(req, res) {
        res.render('mobileCard_info');
    }

    contactLogined(req,res){
        res.render('contact_logined')
    }

    OTP(req,res){
        res.render('OTP_Recovery');
    }
}

module.exports = new UserController();