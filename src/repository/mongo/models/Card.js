const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    endTime: { type: Date, required: true },
    cvv: { type: String, required: true },
    note: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CardModel = mongoose.model('Card', CardSchema);

module.exports = { CardModel, CardSchema };