// core module

// npm module

class HomeController {
    homepage(req, res) {
        res.render('index');
    }
}

module.exports = new HomeController();