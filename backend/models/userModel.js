const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: Number,
  },
  countryCode: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  roleId: {
    type: ObjectId,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  referralCode: {
    type: String,
    required: true,
    unique: true,

  },
},
  {
    timestamps: true,
    versionKey: false,
  }
);


const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
