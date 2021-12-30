const db = require("../models/index");
const User = db.users;

module.exports = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while getting all users."
        });
    }
}
