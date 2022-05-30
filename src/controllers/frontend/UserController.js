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
                console.log(data);
                if (data.code !== 0) {
                    return res.json({
                        code: 1,
                        message: 'Đăng nhập thất bại',
                    });
                } else {
                    res.redirect(`/index/${data.token}`);
                }
            })
    }

    // [GET] /user/register
    register(req, res) {
        res.render('register');
    }

    // [POST] register-process(example)
    registerProcess(req,res){
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

    // [GET] /user/mobile-card
    mobileCard(req, res) {
        res.render('mobileCard');
    }

    // [GET] /user/trade
    trade(req, res) {
        res.render('trade');
    }

    // [GET] /user/information
    information(req, res) {
        const  viewsData = undefined;
        fetch(`http://localhost:${port}/api/accounts/profile`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })

        console.log(viewsData);
        res.render('info', {viewsData});
    }

    // [GET] /user/change-pass
    changePass(req, res) {
        res.render('doimk');
    }

    // [GET] /user/add-id-card
    addIDCard(req, res) {
        res.render('bosungCMND2');
    }

    // [GET] /user/add-id-card
    mobileInfo(req, res) {
        res.render('mobileCard_info');
    }

    // [GET] /user/add-id-card
    contactLogined(req,res){
        res.render('contact_logined')
    }

    // [GET] /user/add-id-card
    OTP(req,res){
        res.render('OTP_Recovery');
    }
}

module.exports = new UserController();