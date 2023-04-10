const UserRating = require("../db/models/userRating_model").UserRating;

/**
 * A function to give user rating when /rateUser endpoint is hit
 * @param {*} req 
 * @param {*} res 
 */

function rateUser(req,res) {
    const newRating = {
        userId: req.body.user,
        rate: req.body.rated
    }

    const rating = new UserRating(newRating);

    rating.save().then((rate) => {
        console.log(rate);

        return res.status(200).json({
            message: `Rating Successfully Posted`,
            rate: rate
        })
    })
}

/**
 * A function to get the User Rating when /get Rating endpoint is hit
 * @param {*} req 
 * @param {*} res 
 */

function getRating(req,res) {
    UserRating.find().then((rate) => {
        return res.status(200).json({
            message: `Rating successfully retrieved`,
            rate: rate
        })
    })
}

module.exports = {
    rateUser,
    getRating
};