const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OtpTrade = new Schema({
    code: { type: Number, required: true },
    lastTime: { type: Date, default: Date.now }
});

const TradeHistory = new Schema({
    userEmail: { type: String, require: true },
    phoneSender: { type: String, require: true },
    phoneReceiver: { type: String, require: true },
    amountTrade: { type: Number, require: true },
    note: { type: String, require: true },
    type: { type: String, enum: ['card', 'people', 'phone'], require: true },
    /*
        type: {
            card  : GD với thẻ tín dụng,
            people: GD với người,
            phone : GD với thẻ điện thoại
        }
    */
    feeWay: { type: String, enum: ['sender', 'receiver'], require: true },
    /*
        feeWay: {
            sender  : Người gửi,
            receiver: Người nhận
        }
     */
    status: { type: String, enum: ['success', 'otpWait', 'adminWait', 'failed'], default: 'otpWait' },
    /*
        status: {
            success  : Thành công,
            otpWait  : Chờ OTP,
            adminWait: Chờ Admin,
            fail     : Thất bại
        }
    */
    otp: OtpTrade,
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TradeHistory', TradeHistory);