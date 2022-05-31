// core module
const readJWT = require('../../utils/util/readJWT');

// npm module

class HomeController {
    homepage(req, res) {
        res.render('index');
    }

    index(req, res) {
        const { token } = req.params;
        // console.log(token);
        const data = readJWT(token);
        console.log(data);
        if (data.firstLog === true) {
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