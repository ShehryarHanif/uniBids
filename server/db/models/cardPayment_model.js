const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Card Payment

const CardPaymentSchema = new Schema({
    paymentAmount: {
        type: Number,
    },
    buyerIdentifier: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    sellerIdentifier: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    productIdentifier: {
        type: Schema.Types.ObjectId,
        ref: "Item",   
    },
    cardNumber: {
        type: Number
    },
    cardMonth: {
        type: Number
    },
    cardYear: {
        type: Number
    },
    cardName: {
        type: String
    },
    specialNumber: {
        type: String
    }
});

const CardPayment = mongoose.model("CardPayment", CardPaymentSchema);

module.exports = {
    CardPayment: CardPayment
};