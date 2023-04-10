const express = require('express');

const actionRouter = express.Router();

const item = require('../controllers/item');
const user = require("../controllers/user");
const payment = require("../controllers/payment");
const rating = require("../controllers/rating");

// When an endpoint is hit, the corresponding controller function is called

actionRouter.get('/itemStuff', item.itemStuff);
actionRouter.get("/getItem", item.getItem);
actionRouter.get("/getItems", item.getItems)
actionRouter.get("/getItemsByIdentifiers", item.getItemsByIdentifiers)
actionRouter.post('/postItem', item.postItem);
actionRouter.post("/updateItem", item.updateItem);
actionRouter.post("/updateBid", item.updateBid);
actionRouter.post("/updateSale", item.updateSale);
actionRouter.post("/updatePayment", item.updatePayment);
actionRouter.post("/removeItem", item.removeItem);
actionRouter.post("/makeCashPayment", payment.makeCashPayment);
actionRouter.post("/makeCardPayment", payment.makeCardPayment);
actionRouter.post("/getCashPayments", payment.getCashPayments);
actionRouter.post("/getCardPayments", payment.getCardPayments);

actionRouter.get("/getUser", user.getUser);
actionRouter.post("/rateUser", rating.rateUser);
actionRouter.get("/getRating", rating.getRating);
// mock Routes
actionRouter.get("/mockItem", item.mockItem);
actionRouter.get("/mockPayment", payment.mockPayment);
actionRouter.get("/mockUser", user.mockUser);

module.exports = actionRouter;