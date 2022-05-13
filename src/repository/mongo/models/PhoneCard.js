const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PhoneCard = new Schema({
    name     : {type: String, required: true},
    cardID   : {type: String, required: true},
    fee      : {type: Number, default: 0},
    createAt : {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PhoneCard', PhoneCard);