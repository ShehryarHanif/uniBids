const User = require("../db/models/user_model").User;
const Item = require("../db/models/item_model").Item;

const bcrypt = require("bcrypt");

/**
 * A mock function to send back a message if the corresponding route is hit
 * @param {*} req 
 * @param {*} res 
*/

function getAuth(req, res) {
    res.send("Hey, it's 'auth'.")
}

/**
 * A function to register user when /register endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

async function registerUser(req, res) {
    try {
        // Generate new password
    
        const salt = await bcrypt.genSalt(10);
   
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(User.User);

        // Create new user

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            room: req.body.room,
            soldItems: [],
            boughtItems: []
        });

        // console.log(newUser); // Save user and respond

        const user = await newUser.save();

        res.status(200).json(user);

        console.log("New User Saved");
    } catch (err) {
        console.log(err)

        res.status(500).json(err);

        console.log("Error in Saving New User");
    }
}

/**
 * A function to login user when /login endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

async function loginUser(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        !user && res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        !validPassword && res.status(400).json("Wrong Password");

        console.log("Successful Log-In of User");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getAuth,
    registerUser,
    loginUser
}