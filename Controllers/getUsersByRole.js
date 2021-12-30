const db = require("../models/index");
const User = db.users;
const typesOfUsers = require("../helpers/typesOfUsers");

module.exports = async (req, res) => {
    try {

        const role = req.params.role;

        const isRoleValid = typesOfUsers.includes(role);

        if(!isRoleValid) return res.status(400).send({status: "failed", message: `${role} is a invalid role!`, validRoles: typesOfUsers})

        const users = await User.findAll({
            where: { role: role }
        });

        res.status(200).send(users);

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while getting user by role."
        });
    }
}
