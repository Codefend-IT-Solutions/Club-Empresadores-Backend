//models
const userModel = require("../models/User");

//Utility Functions
const generateToken = require("../utils/generateToken");

//NPM Packages
const bcrypt = require("bcryptjs");

/**
 * @description Signup
 * @route POST /api/user/signup
 * @access Public
 */
module.exports.userSignup = async (req, res) => {
  const { name, address, phoneNumber, profession, dob, email, password } =
    req.body;

  //Edge cases and errors
  if (name === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Name is required", status: false }] });
  }
  if (address === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Address is required", status: false }] });
  }
  if (phoneNumber === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Phone Number is required", status: false }] });
  }
  if (profession === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Profession is required", status: false }] });
  }
  if (dob === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Date of Birth is required", status: false }] });
  }
  if (email === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email is required", status: false }] });
  } else {
    //Regex
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid email address", status: false }] });
    }
  }
  if (password.length < 8) {
    return res.status(400).json({
      errors: [{ msg: "Password must be atleast 8 characters", status: false }],
    });
  }

  //Signup Logic
  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists", status: false }] });
    } else {
      try {
        //Creating user
        const user = await userModel.create({
          name,
          address,
          phoneNumber,
          profession,
          dob,
          email,
          password,
        });

        //Creating token and sending response
        const token = generateToken(user._id);
        return res.status(200).json({
          msg: "Account Created",
          token,
          status: true,
        });
      } catch (error) {
        return res.status(500).json({ errors: error });
      }
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Login
 * @route POST /api/user/login
 * @access Public
 */
module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  //Edge cases and errors
  if (email === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email is required", status: false }] });
  } else {
    //Regex
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid email address", status: false }] });
    }
  }
  if (password.length < 8) {
    return res.status(400).json({
      errors: [{ msg: "Password must be atleast 8 characters", status: false }],
    });
  }

  //Login logic
  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = generateToken(user._id);
        return res.status(200).json({
          msg: "Login Successfully",
          token,
          status: true,
        });
      } else {
        return res.status(400).json({
          errors: [{ msg: "Invalid Password", status: false }],
        });
      }
    } else {
      return res.status(400).json({
        errors: [{ msg: "User not found", status: false }],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
};
