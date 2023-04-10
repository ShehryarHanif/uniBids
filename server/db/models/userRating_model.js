const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema for User Rating
*/

const UserRatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    rating: [0,0]
});

const UserRating = mongoose.model("UserRating", UserRatingSchema);

module.exports = {
    UserRating: UserRating
};
