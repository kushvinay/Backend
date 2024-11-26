const jwt = require('jsonwebtoken')
let activationToken = (user, ActivationCode) => {
    const token = jwt.sign({
        user,
        ActivationCode
    },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: "1d"
        });

    return token;
}

module.exports = activationToken;   