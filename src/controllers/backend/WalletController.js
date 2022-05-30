// core module
const { CardModel } = require('../../repository/mongo/models/Card');

// npm module
const { validationResult } = require('express-validator');

class WalletController {
    async topUp(req, res) {
        const { cardId, expiredDate, cvv } = req.body;

    }

    async create(req, res) {
        const data = new CardModel({
            cardNumber: '111111',
            cvv: ''
        })
    }
}

module.exports = new WalletController();