const mongoose = require("mongoose");
const cryptoJs = require("crypto-js");
const validator = require("validator");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength:3,
        maxlength: 50
    },

    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    },

    roles: {
        type: [String],
        enum: ["Admin", "User"],
        default: ["Admin"]
    },
    verificationToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verified: Date,
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: String
    },
    refreshToken: {
        type: String,
        default: ""
    }
});

UserSchema.pre("save", async function() {
    if (!this.isModified("password"))
        return;

    //Encrypt Password
    const hashedPass = cryptoJs.AES.encrypt(this.password, process.env.JWT_SECRET_KEY).toString();
    this.password = hashedPass;
});

UserSchema.methods.comparePassword = async function(password) {
    const decryptPass = cryptoJs.AES.decrypt(this.password, process.env.JWT_SECRET_KEY).toString(cryptoJs.enc.Utf8)
    const isMatch = decryptPass === password ? true: false;
    return isMatch;
};

const User = mongoose.model("User", UserSchema)
module.exports = User;