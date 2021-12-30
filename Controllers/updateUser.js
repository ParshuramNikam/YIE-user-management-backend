const db = require("../models/index");
const User = db.users;

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, schoolId, age, address, contactNo, parentName, className } = req.body;

        // const myUser = await User.findOne({where: {id}})
        // console.log(">>>>>>>>>>", myUser, "<<<<<<<<<<<<");

        User.findOne({
            where: { id: id }
        })
            .then(user => {
                if (user) {
                    const updateUserdetails = { username, schoolId, age, address, contactNo, parentName, className };

                    user.update(updateUserdetails)
                        .then(function (updatedUser) {
                            console.log(updatedUser);
                            res.status(200).send(updatedUser);
                        })
                        .catch(err => {
                            res.status(500).send({ status: "failed", message: err.message || "some error ocurred while updaring a user" });
                        });
                }else{
                    console.log("user not found");
                    return res.status(400).send({status: "failed", message:`User not found with id= ${id}`})
                }


            })

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while updating a user."
        });
    }
}