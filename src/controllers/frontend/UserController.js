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

    recoveryPass(req,res){
        res.render('recoveryPass_email');
    }

    deposit(req, res){
        res.render('deposit');
    }

    transfer(req, res){
        res.render('transfer');
    }

    drawback(req, res){
        res.render('drawback');
    }

    mobileCard(req, res){
        res.render('mobileCard');
    }

    trade(req, res){
        res.render('trade');
    }

    information(req, res){
        res.render('info')
    }

    changepass(req, res){
        res.render('doimk');
    }

    addIDCard(req, res){
        res.render('bosungCMND2');
    }

    mobileInfor(req, res){
        res.render('mobileCard_info');
    }
}

module.exports = new UserController();