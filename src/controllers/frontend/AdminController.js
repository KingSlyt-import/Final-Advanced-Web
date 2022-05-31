// core module
const readJWT = require('../../utils/util/readJWT');

// npm module
require('dotenv').config();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;


// routing
class AdminController {
    receiptinfo(req, res){
        res.render('hoadoninfo');
    }

    userlist(req, res){
        const { token, status } = req.params;
        const data = readJWT(token);
        let link = '';
        let title = '';
        if (data.code !== 0) {
            return res.redirect('/');
        }
        if(status === 'waiting'){
            link = 'get-waiting-list';
            title = 'DANH SÁCH TÀI KHOẢN CHỜ KÍCH HOẠT';
        }
        else if (status === 'verified'){
            link = 'get-verified-list';
            title = 'DANH SÁCH TÀI KHOẢN ĐANG KÍCH HOẠT';
        }
        else if (status === 'disabled'){
            link = 'get-disabled-list';
            title = 'DANH SÁCH TÀI KHOẢN BỊ KHÓA';
        }
        else if (status === 'soft-disabled'){
            link = 'get-softdisabled-list';
            title = 'DANH SÁCH TÀI KHOẢN VÔ HIỆU HÓA';
        }
        fetch(`http://localhost:${port}/api/admin/${link}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    return res.json({
                        code: 1,
                        message: 'Lấy thông tin người dùng thất bại',
                    });
                } else {
                    console.log(response);
                    res.render('dsuser', {
                        data: response.data,
                        title,
                        token
                    });
                }
            });
    }

    infoAdmin(req, res){
        const { token, email } = req.params;
        const data = readJWT(token);
        fetch(`http://localhost:${port}/api/admin/get-user-by-email/${email}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 0) {
                    return res.json({
                        code: 1,
                        message: 'Lấy thông tin người dùng thất bại',
                    });
                } else {
                    res.render('info_admin', {token, data: response.data});
                }
            });
    }
};



module.exports = new AdminController();