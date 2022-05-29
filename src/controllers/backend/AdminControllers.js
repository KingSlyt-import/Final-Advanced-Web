// core module
const { AccountModel } = require('../../repository/mongo/models/Account');
require('dotenv').config();

// npm module

class AdminControllers {
    // [GET] /api/admin/
    getAdminControllers(req, res) {
        return res.json({
            code: 0,
            message: 'Admin Controller',
        });
    }


    // [GET] /api/admin/get-waiting-list
    async getWaitingList(req, res) {
        const data = await AccountModel.find({ status: 'waiting' }).select('email fullName role status ').sort({ createdAt: -1 });
        return res.json({
            code: 0,
            message: 'Lấy danh sách tài khoản chờ kích hoạt thành công',
            data
        });
    };

    // [GET] /api/admin/get-verified-list
    async getVerifiedList(req, res) {
        const data = await AccountModel.find({ status: 'verified' }).select('email fullName role status').sort({ createdAt: -1 });
        return res.json({
            code: 0,
            message: 'Lấy danh sách tài khoản đã kích hoạt thành công',
            data
        });
    }

    // [GET] /api/admin/get-disabled-list
    async getDisabledList(req, res) {
        const data = await AccountModel.find({ status: 'disabled' }).select('email fullName role status').sort({ createdAt: -1 });
        return res.json({
            code: 0,
            message: 'Lấy danh sách tài khoản đã vô hiệu hóa thành công',
            data
        });
    }

    // [GET] /api/admin/get-softDisabled-list
    async getSoftDisabledList(req, res) {
        const data = await AccountModel.find({ status: 'softDisabled' }).select('email fullName role status').sort({ createdAt: -1 });
        return res.json({
            code: 0,
            message: 'Lấy danh sách tài khoản đang bị khóa thành công',
            data
        });
    }

    // [PUT] /api/admin/verify-account/
    async verifyAccount(req, res) {
        const { email } = req.user;
        const data = await AccountModel.findOneAndUpdate({ email, status: 'waiting' }, { status: 'verified' });
        if (!email) {
            return res.json({
                code: 2,
                message: 'Không tìm thấy tài khoản',
            })
        }
        return res.json({
            code: 0,
            message: 'Xác minh tài khoản thành công',
            data
        });
    }

    // [GET] /api/admin/get-all-account
    async getAllAccount(req, res) {
        const data = await AccountModel.find({});

        if (!data) {
            return res.json({
                code: 3,
                message: 'Không tìm thấy người dùng nào'
            })
        };

        return res.json({
            code: 0,
            message: 'Nhận dữ liệu thành công',
            data
        });
    };

    // [PUT] /api/admin/unlock-account
    async unlockAccount(req, res) {
        const { email } = req.user;
        const data = await AccountModel.findOneAndUpdate({ email, status: 'disabled' }, { status: 'waiting' });
        if (!email) {
            return res.json({
                code: 2,
                message: 'Không tìm thấy tài khoản',
            })
        }
        return res.json({
            code: 0,
            message: 'Mở khóa tài khoản thành công',
            data
        });
    }
}

module.exports = new AdminControllers();