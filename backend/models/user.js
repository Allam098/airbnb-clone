const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let passportLocalMongoose = require("passport-local-mongoose");

// 👇 Fix for Node 24 module wrapping
if (passportLocalMongoose.default) {
  passportLocalMongoose = passportLocalMongoose.default;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verificationCode: String,
  verificationCodeExpires: Date
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
