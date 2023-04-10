const User = require("../db/models/user_model").User;
const Item = require("../db/models/item_model").Item;

/**
 * A function to send back response when /itemStuff endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function itemStuff(req, res) {
    res.send("Hey, it's the item stuff!")
}

/**
 * A function to get an item from the item id when /getItem endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function getItem(req, res){
    const id = req.query.id;

    console.log(req.query)

    Item.findById(id).then((item) => {
        return res.status(200).json({
            message: `Item with id: ${item._id} successfully retrieved`,
            item: item
        })
    });
}

/**
 * A function to get all items when /getItems endpoint is hit 
 * @param {*} req 
 * @param {*} res 
*/

function getItems(req, res) {
    Item.find().then((items) => {
        return res.status(200).json({
            message: `Items successfully retrieved`,
            items: items
        })
    });
}

/**
 * A function to get all items from their identifiers when /getItemByIdentifiers endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function getItemsByIdentifiers(req, res) {
    const identifiers = req.query.identifiers;

    Item.find({ "_id" : { "$in" :  identifiers } }).then((items) => {
        return res.status(200).json({
            message: `Items successfully retrieved`,
            items: items
        })
    });
};

/**
 * A function to create and store a new Item document when /postItem endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function postItem(req, res) {
    const newItem = {
        name: req.body.name,
        sellerId: req.body.sellerId,
        imageUrl: req.body.imageUrl,
        highestBid: 0,
        highestBidder: null,
        initialBid: req.body.initialBid,
        timer: new Date(req.body.timer),
        description: req.body.description,
        sold: false,
        pendingPayment: true
    }

    let item = new Item(newItem);

    item.save().then((specifiedItem) => {
        User.findById(specifiedItem["sellerId"], function(err, specificUser){
            console.log(specifiedItem)
         
            if(err){
                res.status(500).json(err);
            } else {
                specificUser["soldItems"].push(item["_id"]);

                specificUser.markModified();

                specificUser.save();
            }
        });

        return res.status(200).json({
            message: `Item with Identifier ''${item._id}'' Successfully Posted}`
        })
    })
}

/**
 * A function to update an item given its id
 * @param {*} req 
 * @param {*} res 
*/

function updateItem(req, res) {
    const itemIdentifier = req.body.id;

    const newItem = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        highestBid: req.body.highestBid,
        initialBid: req.body.initialBid,
        timer: req.body.timer,
        description: req.body.description,
        sold: req.body.sold
    }

    Item.findOne({_id: itemIdentifier}, (err, requiredItem) => {
        if(err){
            res.status(500).json(err);
        } else{
            requiredItem["name"] = req.body.name;
            requiredItem["imageUrl"] = req.body.imageUrl;
            requiredItem["highestBid"] = req.body.highestBid;
            requiredItem["initialBid"] = req.body.initialBid;
            requiredItem["timer"] = req.body.timer;
            requiredItem["description"] = req.body.description;
            requiredItem["sold"] = req.body.timer;
    
            requiredItem.save();

            return res.status(200).json({
                message: `Item with Identifier ''${item._id}'' Successfully Updated`
            })
        }
    });
}

/**
 * A function to update the item with the highest bid and highest bidder when /updateBid endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function updateBid(req, res) {
    const itemIdentifier = req.body.itemIdentifier;

    const userIdentifier = req.body.userIdentifier;

    const itemBid = req.body.bid;

    console.log(itemIdentifier, userIdentifier, itemBid)

    Item.findOne({_id: itemIdentifier}, (err, requiredItem) => {
        if(err){
            res.status(500).json(err);
        } else{
            requiredItem["highestBid"] = itemBid;
            requiredItem["highestBidder"] = userIdentifier;
    
            requiredItem.save();
            
            return res.status(200).json({
                message: `Item with Identifier ''${requiredItem._id}'' Successfully Updated`,
                item: requiredItem
            })
        }
    });
}

/**
 * A function to update status of sold item and update boughtItems of buyer when /updateSale endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function updateSale(req, res) {
    const itemIdentifier = req.body.itemIdentifier;

    Item.findOne({_id: itemIdentifier}, (err, requiredItem) => {
        if(err){
            res.status(500).json(err);
        } else{
            requiredItem["sold"] = !requiredItem["sold"];

            requiredItem.save();

            console.log(requiredItem)

            User.findById(requiredItem["highestBidder"], function(err, specificUser){
                if(err){
                    res.status(500).json(err);
                } else {
                    specificUser["boughtItems"].push(requiredItem["_id"]);
    
                    specificUser.markModified();
    
                    specificUser.save();
                }
            })
            
            return res.status(200).json({
                message: `Item with Identifier ''${requiredItem._id}'' Successfully Updated`
            })
        }
    });
}

/**
 * A function to update pendingPayment status of the item when /updatePayment endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function updatePayment(req, res) {
    const itemIdentifier = req.body.itemIdentifier;

    Item.findById(itemIdentifier, (err, requiredItem) => {
        if(err){
            res.status(500).json(err);
        } else{
            requiredItem["pendingPayment"] = !requiredItem["pendingPayment"];

            requiredItem.save();
            
            return res.status(200).json({
                message: `Item with Identifier ''${requiredItem._id}'' Successfully Updated`
            })
        }
    });
}

/**
 * A function to remove item given its id when /removeItem endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function removeItem(req, res) {
    const itemIdentifier = req.body.itemIdentifier;

    Item.findOne({_id: itemIdentifier}, function(err, specificItem){
        if(err){
            res.status(500).json(err);
        } else {
            User.find({"_id": item["highestBidder"]}, function(err, specificUser){
                if(err){
                    res.status(500).json(err);
                } else {
                    specificUser["boughtItems"] = specificUser["boughtItems"].filter(identifier => identifier !== idemIdentifier);
    
                    specificUser.markModified();
    
                    specificUser.save();
                }
            });

            User.find({"_id": item["sellerId"]}, function(err, specificUser){
                if(err){
                    res.status(500).json(err);
                } else {
                    specificUser["soldItems"] = specificUser["soldItems"].filter(identifier => identifier !== idemIdentifier);
    
                    specificUser.markModified();
    
                    specificUser.save();
                }
            });

            specificItem.remove();
        };
    });
}

/**
 * A function to return a mock response when /mockItem endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function mockItem(req, res) {
    res.send("mockItem success");
}

module.exports = {
    itemStuff,
    getItem,
    getItems,
    getItemsByIdentifiers,
    postItem,
    updateItem,
    updateBid,
    updateSale,
    updatePayment,
    removeItem,
    mockItem,
};