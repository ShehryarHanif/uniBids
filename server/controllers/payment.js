const User = require("../db/models/user_model").User;
const Item = require("../db/models/item_model").Item;
const CashPayment = require("../db/models/cashPayment_model").CashPayment;
const CardPayment = require("../db/models/cardPayment_model").CardPayment;

const bcrypt = require("bcrypt");

/**
 * A function to create a new CashPayment document when /makeCashPayment endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function makeCashPayment(req, res) {
    const newPayment = {
        paymentAmount: req.body.paymentAmount,
        buyerIdentifier: req.body.buyerIdentifier,
        sellerIdentifier: req.body.sellerIdentifier,
        productIdentifier: req.body.productIdentifier
    }

    const payment = new CashPayment(newPayment);

    payment.save().then((specifiedPayment) => {
        console.log(specifiedPayment);

        return res.status(200).json({
            message: `Payment with Identifier ''${specifiedPayment._id}'' Successfully Posted}`
        })
    })
}

/**
 * A function to create a new CardPayment document when /makeCardPayment endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function makeCardPayment(req, res) {
    // const salt = bcrypt.genSalt(10);
   
    // const hashedNumber = bcrypt.hash(Number(req.body.specialNumber), salt);

    const newPayment = {
        paymentAmount: req.body.paymentAmount,
        buyerIdentifier: req.body.buyerIdentifier,
        sellerIdentifier: req.body.sellerIdentifier,
        productIdentifier: req.body.productIdentifier,
        cardNumber: Number(req.body.cardNumber),
        cardMonth: req.body.cardMonth,
        cardYear: req.body.cardYear,
        cardName: req.body.cardName,
        specialNumber: req.body.specialNumber
    }

    const payment = new CardPayment(newPayment);

    payment.save().then((specifiedPayment) => {
        console.log(specifiedPayment);
        
        return res.status(200).json({
            message: `Payment with Identifier ''${specifiedPayment._id}'' Successfully Posted}`
        })
    })
}

/**
 * A function to return all cash payments when /getCashPayments endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/
function getCashPayments(req, res) {
    CashPayment.find().then((payments) => {
        return res.status(200).json({
            message: `Payments successfully retrieved`,
            payments: payments
        })
    });
}

/**
 * A function to return all card payments when /getCardPayments endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function getCardPayments(req, res) {
    CardPayment.find().then((payments) => {
        return res.status(200).json({
            message: `Payments successfully retrieved`,
            payments: payments
        })
    });
}

/**
 * A function to mock a response when /mockPayment endpoint is hit
 * @param {*} req 
 * @param {*} res 
 * @returns 
*/

function mockPayment(req, res) {
    return res.send("mockPayment success");
}

module.exports = {
    makeCashPayment,
    makeCardPayment,
    getCashPayments,
    getCardPayments,
    mockPayment
};