const mongoose = require('mongoose');

const  ProductSchema = new mongoose.Schema({

    description:{type: String, required: true},
    unitprice:{type: Number, required: true, unique: true},
    qty:{type: Number, required: true},
})

module.exports = mongoose.model('product', ProductSchema);