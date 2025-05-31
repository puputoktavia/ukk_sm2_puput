const jwt = require('jsonwebtoken')
const secretKey = "ayoosekolah"

const authJWt = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        const autht = token.split(' ')[1]
        console.log('Token', autht)
        jwt.verify(autht, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

module.exports = {authJWt}