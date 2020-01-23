const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product: {type: mongoose.Types.ObjectId, required: true, ref: 'Product'},
    quantity: {type: Number, required: true, default: 1}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;