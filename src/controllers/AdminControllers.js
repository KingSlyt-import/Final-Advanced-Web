// core module
const { AccountModel } = require('../repository/mongo/models/User');

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
        const data = await AccountModel.find({ status: 'waiting'}).select('email fullName role status ').sort({ createdAt: -1 });
        return res.json({
            code: 0,
            message: 'Get Waiting List Success',
            data
        });
    };

    // [GET] /api/admin/get-verified-list
    async getVerifiedList(req, res) {
        const data = await AccountModel.find({ status: 'verified'}).select('email fullName role status').sort({ createdAt: -1 });
        return res.json({
            code: 0,
            message: 'Get Verified List Success',
            data
        });
    }

    // [GET] /api/admin/get-disabled-list
    async getDisabledList(req, res) {
        const data = await AccountModel.find({ status: 'disabled'}).select('email fullName role status').sort({ createdAt: -1 });
        return res.json({
            code: 0,
            message: 'Get Disabled List Success',
            data
        });
    }

    // [PUT] /api/admin/verify-account/:email
    async verifyAccount(req, res) {
        const { email } = req.params;
        const data = await AccountModel.findOneAndUpdate({ email, status: 'waiting'}, { status: 'verified' });
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

    // [PUT] /api/admin/unlock-account/:email
    async unlockAccount(req, res) {
        const { email } = req.params;
        const data = await AccountModel.findOneAndUpdate({ email, status: 'disabled'}, { status: 'waiting' });
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