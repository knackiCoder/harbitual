const jwt = require("jsonwebtoken");


const createAccess = ({ payload }) => {
    //Create jwt
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "10s"}
    );
    return accessToken;
}

const createRefresh = ({ payload }) => {
    const RefreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: "1d"}
    );
    return RefreshToken;
}



module.exports = {
    createAccess,
    createRefresh
}