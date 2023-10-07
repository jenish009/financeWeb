const { userModel, otpModel } = require("../models");
const nodemailer = require("nodemailer"); // Import nodemailer for sending emails
const { sendEmail } = require("../utils/sendEmail");
const fs = require("fs");
const login = async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    // Validate email or phone number format (you can use a library like validator.js)
    if (!isValidEmail(email) && !isValidPhoneNumber(phoneNumber)) {
      return res.status(400).json({ message: "Invalid email or phone number format" });
    }

    const user = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = user.password.includes(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!email) {
      throw new Error('Please provide a valid email address.');
    }
    if (!name) {
      throw new Error('This email is already registered.');
    }

    let userExist = await userModel.findOne({ email });

    if (userExist && userExist.isVerified) {
      throw new Error('This email is already registered.');
    }

    let data;
    let referralCode = await generateUniqueReferralCode()
    if (!userExist) {
      data = await userModel.create({
        email,
        name,
        referralCode
      });
    } else {
      data = userExist;
    }

    const otp = generateOTP();

    await otpModel.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true, setDefaultsOnInsert: true });

    const emailTemplate = fs.readFileSync("utils/emailTemplates/emailTemplate.html", "utf8")
      .replace(/\|USERNAME\|/g, name)
      .replace(/\|OTP\|/g, otp);

    const emailSent = await sendEmail(email, emailTemplate, 'OTP to login');

    return res.status(500).json({ data, message: 'OTP has been sent to your email address. Please check your inbox.' });
  } catch (error) {
    console.error("error>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let { otp, email } = req.query;
    if (!otp) {
      throw new Error('Please provide a valid OTP.');
    }
    if (!email) {
      throw new Error('Email address not found.');
    }

    const otpVerified = await otpModel.findOneAndDelete({ email, otp }); // Delete the OTP data

    if (!otpVerified) {
      throw new Error("Invalid OTP. Please check the OTP you've entered.");
    }

    const verifyUser = await userModel.findOne({ email });

    if (!verifyUser) {
      throw new Error("User not found. Please sign up before verifying.");
    }

    const userData = verifyUser.toObject();

    res.status(200).send({
      success: true,
      data: { verify: true, ...userData }
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    let { id, countryCode, phoneNo, password, name, email } = req.body
    if (!id) {
      throw new Error("User not found. Please provide a valid user ID.");
    }

    const updateFilter = { isVerified: true };
    const existingUser = await userModel.findOne({ _id: id });

    if (!existingUser) {
      throw new Error("User not found.");
    }
    if (password && password.length < 8) {
      throw new Error("Passwords must be at least 8 characters long.");
    }

    if (phoneNo) {
      if (!/^\d{10}$/.test(phoneNo)) {
        throw new Error("Please provide a valid 10-digit phone number.");
      }
      if (countryCode) {
        updateFilter.countryCode = countryCode;
        updateFilter.phoneNo = phoneNo;
      } else {
        updateFilter.phoneNo = phoneNo;
      }
    }

    if (password) {
      // const hashedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();
      updateFilter.password = password;
    }

    if (name) {
      updateFilter.name = name;
    }

    if (email) {
      updateFilter.email = email;
    }

    if (email || phoneNo) {
      const duplicateUser = await userModel.findOne({
        $and: [
          { _id: { $ne: id } },
          {
            $or: [
              { email },
              {
                $and: [
                  { countryCode: updateFilter.countryCode },
                  { phoneNo: updateFilter.phoneNo }
                ]
              }
            ]
          }
        ]
      });
      if (duplicateUser) {
        if (duplicateUser.email == email) {
          throw new Error("Email address is already in use.");
        } else if (
          duplicateUser.countryCode === updateFilter.countryCode &&
          duplicateUser.phoneNo === updateFilter.phoneNo
        ) {
          throw new Error("Phone number is already registered.");
        }
      }
    }

    const profileUpdated = await userModel.findOneAndUpdate(
      { _id: id },
      updateFilter,
      { new: true }
    );
    res.status(200).send({
      success: true,
      data: profileUpdated,
      message: "Your profile has been successfully updated."
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
};
function isValidEmail(email) {
  return true;
}

function isValidPhoneNumber(phoneNumber) {
  return true;
}

async function generateUniqueReferralCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let referralCode = "";

  let isUnique = false;
  while (!isUnique) {
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
    }

    const existingUser = await userModel.findOne({ referralCode });
    if (!existingUser) {
      isUnique = true; // The code is unique, exit the loop
    } else {
      referralCode = "";
    }
  }

  return referralCode;
}


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = {
  login,
  signup,
  verifyOtp,
  updateProfile
};
