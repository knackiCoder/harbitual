const CustomAPIError = require("../errors");
const User = require("../models/user");
const crypto = require('crypto');
const { verificationEmail, createUser } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { createAccess, createRefresh } = require("../utils/jwt");

const Register = async (req, res, next) => {
     const { name, email, password} = req.body;

     if(!name || !email || !password) {
         throw new CustomAPIError.BadRequestError("Please fill all fields");
     }

     const emailExist = await User.findOne({ email })
     if (emailExist) {
         throw new CustomAPIError.BadRequestError("Email Already taken");
     }
     
     const verificationToken = crypto.randomBytes(40).toString("hex");

     const isFirstUser = (await User.countDocuments({})) === 0;
     const role = isFirstUser ? "Admin" : "User";

     const user = await User.create({
         name,
         email,
         password,
         role,
         verificationToken,
     });

     const origin = "http://localhost/5000";

     await verificationEmail({
         name: user.name,
         email: user.email,
         verificationToken: user.verificationToken,
         origin
     });

     res.status(StatusCodes.CREATED).json({
         message: "Success! Please check your email to verify your account"
     });
}

const verifyEmail = async (req, res,next) => {
    const { verificationToken, email } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        throw new CustomAPIError.BadRequestError("No user found");
    }

    if(user.verificationToken !== verificationToken) {
        throw new CustomAPIError.BadRequestError("Invalid Token");
    }

    (user.isVerified = true);
    (user.verified = Date.now().toString())
    user.verificationToken = "";

    await user.save()

    res.status(StatusCodes.OK).json({ msg: 'Email Verified! Please proceed to login' });
}


const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        throw new CustomAPIError.BadRequestError("Please provide all credentials")
    };

    const user = await User.findOne({ email }).exec();


    if(!user) {
        throw new CustomAPIError.UnauthenticatedError("Invalid Credentials!")
    }

    //Did the comparison in the user schema
    const matchPassword = await user.comparePassword(password);
    
    if(!matchPassword) {
        throw new CustomAPIError.UnauthenticatedError("Invalid Credentials!")
    }

    if(!user.isVerified) {
        throw new CustomAPIError.UnauthenticatedError("Please verify your email")
    }

    const id = user._id.toString()
    const [ role ] = user.roles;
    const access = createAccess({
        payload: { 
            id,
            role
        } 
    })
    const refresh = createRefresh({
        payload: { 
            id,
            role
        }
     });

    user.refreshToken = refresh;
    const result = await user.save();

    const { roles, name } = result;
    
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("RefreshToken", refresh, {
        httpOnly: true,
        secure: true,
        maxAge: oneDay,
        signed: true,
        sameSite: true
    });
    

    res.status(StatusCodes.OK).json({ 
        success: true,
        email,
        roles,
        name,
        access });
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.signedCookies;

    if(!cookies?.RefreshToken) {
        throw new CustomAPIError.UnauthorizedError("No cookie found");
    }

    const refreshToken = cookies.RefreshToken

    const userRefresh = await User.findOne({ refreshToken });


    if(userRefresh.refreshToken !== refreshToken) {
        throw new CustomAPIError.BadRequestError("No Refresh Token")
    }

    //verifying jwt
    const jwtRefresh = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN
    )
    const id = userRefresh._id.toString()
    const name = userRefresh.name;
    const email = userRefresh.email;

    if(!jwtRefresh || id !== jwtRefresh.id) {
        throw new CustomAPIError.UnauthenticatedError("Invalid Token")
    }

    const [ role ] = userRefresh.roles;
    const roles = userRefresh.roles;
    const access = createAccess({
        payload: { 
            id,
            role
        } 
    });

    res.status(StatusCodes.OK).json({ 
        success: true, 
        roles,
        access,
        name,
        email });
}
const logout = async (req, res) => {
    const cookies = req.signedCookies;

    if(!cookies?.RefreshToken) {
        throw new CustomAPIError.UnauthorizedError("No cookie found");
    }
    const refreshToken = cookies.RefreshToken;

    const userRefresh = await User.findOne({ refreshToken }).exec();

    const oneDay = 1000 * 60 * 60 * 24;

    if(!userRefresh) {
        res.clearCookie("RefreshToken", "",
        { httpOnly: true,
        secure: true,
        maxAge: new Date(Date.now() + oneDay),
    }) }

    userRefresh.refreshToken = ""
    const result = await userRefresh.save()

    res.clearCookie("RefreshToken", "",
        { httpOnly: true,
        secure: true,
        maxAge: new Date(Date.now() + oneDay),
        signed: true 
    })
    res.status(StatusCodes.OK).json({ "message": "It's not bye but see you soon!"})
}

module.exports = {
    Register,
    verifyEmail,
    login,
    handleRefreshToken,
    logout
};