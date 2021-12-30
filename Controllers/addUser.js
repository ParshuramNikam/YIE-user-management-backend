
const signJwtToken = require("../helpers/signJwtToken");
const db = require("../models/index");
const User = db.users;

module.exports = async (req, res) => {
    try {
        const newUser = res.locals.newUser;
        console.log(">>>>", newUser);

        const user = await User.create(newUser);

        const token = await signJwtToken(user.id, user.role);

        console.log("=========================");
        console.log("JWT TOKEN created: ", token);
        console.log("=========================");

        res.status(200).cookie('yie_access_token', token).send(user);

        console.log("cookie stored in frontend : ", req.cookies.yie_access_token);

        return;
        
    } catch (err) {
        res.status(500).send({
            status: "failed",
            message: err.message || "Some error occurred while adding/registering a new user."
        });

    }
}