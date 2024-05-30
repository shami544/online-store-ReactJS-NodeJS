const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
    cart: [{
        category: String,
        name: String,
        title: String,
        information: String,
        price: Number,
        number: Number,
        file: [String],
        quantity: Number,
    }],
    receiptAddress: {
        type: {
            city: { type: String, required: false },
            district: { type: String, required: false },
            street: { type: String, required: false },
            architectureName: { type: String, required: false },
            apartmentNumber: { type: String, required: false },
            floorNumber: { type: String, required: false },
            additionalDetails: { type: String, required: false },
        },
        default: []
    },
    receipt: {
        type: String,
    },
    payment: {
        type: String,
    },
    quantity: {
        type: String,
    },
    totalPrice: {
        type: Number,
    },
    UserDetails: {
        id: { type: String },
        name: { type: String },
        phone: { type: String },
    },
    DateOrder: {
        type: String,
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order; 