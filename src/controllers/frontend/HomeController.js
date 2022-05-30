// core module

// npm module

class HomeController {
    homepage(req, res) {
        res.render('index');
    }

    index(req, res) {
        res.render('logined');
    }

    contact(req, res){
        res.render('contact');
    }
}

module.exports = new HomeController();