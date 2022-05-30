// core module
require('dotenv').config();

// npm module

// routing
class AdminController {
    receiptinfo(req, res){
        res.render('hoadoninfo');
    }

    userlist(req, res){
        res.render('dsuser');
    }
};

module.exports = new AdminController();