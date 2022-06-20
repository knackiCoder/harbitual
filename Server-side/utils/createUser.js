const createUser = ( user ) => {
    return {
       name: user.name,
       email: user.email,
       userId: user._id,
       roles: user.roles,
       isVerified: user.isVerified,
       verified: user.verified,
       refreshToken: user.refreshToken
    };
 };
 
 module.exports = createUser;