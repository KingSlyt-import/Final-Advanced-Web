// core module

// npm module

class UserController {
    // [GET] /user/login
    login(req, res) {
        res.render('login');
    };

    // [GET] /user/register
    register(req, res) {
        res.render('register');
    }
}

module.exports = new UserController();