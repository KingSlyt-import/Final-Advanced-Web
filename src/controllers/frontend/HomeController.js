// core module

// npm module

class HomeController {
    homepage(req, res) {
        res.render('index');
    }

    index(req, res) {
        res.render('logined');
    }
}

module.exports = new HomeController();