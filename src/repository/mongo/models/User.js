const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    phone: { type: String, required: true, maxLength: 10 },
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    address: { type: String, required: true },
    idCardFront: { type: String, required: true },
    idCardBack: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    firstLog: { type: Boolean, required: true, default: true },
    status: { type: String, enum: ['waiting', 'verified', 'disabled', 'addInfo'], default: 'waiting' },
    /*
        status: {
            waiting    : Chờ xác minh,
            verified   : Đã xác minh,
            disabled   : Vô hiệu hóa,
            addInfo   : Bổ sung thông tin
        }
    */
    username: { type: String, required: true },
    password: { type: String, required: true },
    money: { type: Number, default: 0 },
    tradeCount: { type: Number, default: 0 },
    tradeDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    otp: {
        code: { type: Number, default: 0 },
        lastTime: { type: Date, default: Date.now }
    },
    loginAttempt: {
        count: { type: Number, default: 0 },
        lastTime: { type: Date, default: Date.now },
        penalty: { type: Boolean, default: false }
    }
});

const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = { AccountModel, AccountSchema };