const db = require("../models/index");
const User = db.users;

module.exports = async (req, res) => {
    try {

        const id = req.params.id;

        const user = await User.findOne({
            where: { id: id }
        })

        if (!user) return res.status(400).send({ status: "failed", message: "User not found!" });

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while getting single user."
        });
    }
}