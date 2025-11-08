const mongoose = require('mongoose');

const  orderSchema = new mongoose.Schema({

    date:{type: String, required: true},
    totalCost:{type: String, required: true, unique: true},
    products:{type: Array, required: true},
    customer:{type: Object, required: true},
})

module.exports = mongoose.model('order', orderSchema);