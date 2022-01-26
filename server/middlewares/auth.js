const { Token } = require("../models/token")
const jwt = require("jsonwebtoken")

let auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ") [1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    Token.findOne({_employeeId: decoded.employeeId, token, tokenType: 'login'}, (err, employeeToken) => {
        if(err) throw err;
        if(!employeeToken){
            return res.json({
                isAuth: false,
            })
        }
        req.token = token;
        req.employeeId = decoded.employeeId
        next()
    })
}

module.exports = {auth}