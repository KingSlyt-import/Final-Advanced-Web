// core module
const { CardModel } = require('../../repository/mongo/models/Card');

// npm module
const { validationResult } = require('express-validator');

class WalletController {
    async topUp(req, res) {
        const { cardId, expiredDate, cvv } = req.body;

    }
}

module.exports = new WalletController();