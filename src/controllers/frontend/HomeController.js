// core module
const { AccountModel } = require('../../repository/mongo/models/Account');
const readJWT = require('../../utils/util/readJWT');

// npm module

class HomeController {
    homepage(req, res) {
        res.render('index');
    }

    async index(req, res) {
        const { token } = req.params;
        // console.log(token);
        const data = readJWT(token);
        // console.log(data);
        const user = await AccountModel.findOne({ email: data.email });
        if (user.firstLog === true) {
            res.render('nhapmkmoi', {
                data,
                token
            })
        } else {
            res.render('logined', {
                data,
                token
            });
        }

    }

    contact(req, res) {
        res.render('contact');
    }
}

module.exports = new HomeController();