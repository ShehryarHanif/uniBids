const User = require("../db/models/user_model").User;

/**
 * A function to get user info from user id when /getUser endpoint is hit
 * @param {*} req 
 * @param {*} res 
*/

function getUser(req, res){
    const id = req.query.id;

    console.log("Finding User");

    User.findById(id).then((user) => {        
        return res.status(200).json({
            message: `User with ID ''${user._id}'' successfully retrieved`,
            user: user
        })
    });
}

/**
 * A function to mock a response when /mockUser endpoint is hit
 * @param {*} req 
 * @param {*} res 
 * @returns 
*/

function mockUser(req, res) {
    return res.send("mockUser success");
}

module.exports = {
    getUser,
    mockUser
}