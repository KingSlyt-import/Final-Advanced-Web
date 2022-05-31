// core module
const { CardModel } = require('../../repository/mongo/models/Card');
const { AccountModel } = require('../../repository/mongo/models/Account');

// npm module
const { validationResult } = require('express-validator');

class WalletController {
    async topUp(req, res) {
        const result = validationResult(req);
        if (result.errors.length !== 0) {
            let message = result.errors[0].msg;

            return res.json({
                code: 0,
                message
            })
        }

        const { cardId, expiredDate, cvv, amount } = req.body;
        const card = await CardModel.findOne({ cardId });

        if (!card) {
            return res.json({
                code: 3,
                message: 'Không tìm thấy thẻ tín dụng của quý khách'
            });
        }

        if (cvv !== card.cvv) {
            return res.json({
                code: 3,
                message: 'Mã CVV thẻ tín dụng của quý khách không hợp lệ'
            });
        }

        // if (expiredDate !== card.expiredAt) {
        //     return res.json({
        //         code: 3,
        //         message: 'Ngày hết hạn thẻ tín dụng của quý khách không hợp lệ'
        //     });
        // }


    }

    async create(req, res) {
        const data = new CardModel({
            cardId: '333333',
            cvv: '577',
            description: 'Khi nạp bằng thẻ này thì luôn nhận được thông báo là “thẻ hết tiền” ',
            expiredAt: new Date('December 12, 2022 00:00:00' + 'Z').toISOString()
        });

        data.save()
            .then(() => {
                res.send('Lưu thẻ thành công');
            })
            .catch(e => {
                res.send(e.message);
            });
    }
}

module.exports = new WalletController();