const db = require("../models/index");
const User = db.users;

module.exports = async (req, res) => {
    try {

        const id = req.params.id;

        const isUserDeleted = await User.destroy(
            { where: { id: id } },
        )

        console.log("user deleted : ",isUserDeleted);

        if (!isUserDeleted) {
            res.status(400).send({ status: "failed", message: `User not found!` })
            return;
        }

        console.log(`user with id=${id} deleted sucessfully!`);
        res.status(200).send({ status: "success", message: `user with id= ${id} deleted sucessfully!` })

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while deleteing a user"
        });
    }
}
