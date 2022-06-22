const jwt = require("jsonwebtoken");
const register = require("../mernbackend/models/Register");


const auth = async(req, res, next) => {

    try {

        const token = req.cookie.jwt;
        const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyuser);

        const user = await Register.fineOne({ _id: verifyuser._id })
        console.log(user.txt);

        next();
    } catch (error) {
        res.status(401).send(error);
    }


}

module.exports = auth;