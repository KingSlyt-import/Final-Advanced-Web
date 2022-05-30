const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    cardId: { type: String, required: true },
    cvv: { type: String, required: true },
    note: { type: String, required: true },
    expiredAt: { type: Date, required: true },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CardModel = mongoose.model('Card', CardSchema);

module.exports = { CardModel, CardSchema };