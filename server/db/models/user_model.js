const mongoose = require("mongoose");

// Schema for User

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    room: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    boughtItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    soldItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    rating: { type: Schema.Types.ObjectId, ref: 'UserRating' }
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User: User
};