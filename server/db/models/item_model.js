const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Item

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  imageUrl: {
    type: String,
  },
  highestBid: {
    type: Number,
  },
  highestBidder: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  initialBid: {
    type: Number,
  },
  timer: {
    type: Date,
  },
  description: {
    type: String,
  },
  sold: {
    type: Boolean,
  },
  pendingPayment: {
    type: Boolean,
  }
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = {
  Item: Item
};