const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Cash Payment

const CashPaymentSchema = new Schema({
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
});

const CashPayment = mongoose.model("CashPayment", CashPaymentSchema);

module.exports = {
    CashPayment: CashPayment
};