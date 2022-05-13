const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Card = new Schema({
    cardNumber: {type: String, required: true},
    endTime   : {type: Date, required: true},
    cvv       : {type:String, required: true},
    note      : {type:String, required: true},
    createAt  : {type: Date, default: Date.now},
    updatedAt : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Card', Card);