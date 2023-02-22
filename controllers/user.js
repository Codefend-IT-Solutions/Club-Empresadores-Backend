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

/**
 * @description Add User Profile Image
 * @route PUT /api/user/profile-image
 * @access Private
 */
module.exports.addProfileImage = async (req, res) => {
  const { _id } = req.user;
  const { profileImage } = req.body;

  //Edge Case
  if (profileImage === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Image is required", status: false }] });
  }

  try {
    await userModel.updateOne({ _id }, { profileImage });

    //Response
    return res.status(200).json({
      msg: "Profile Image Updated Successfully",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get User Info
 * @route GET /api/user/whoami
 * @access Private
 */
module.exports.userInfo = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await userModel.findOne({ _id });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "User not found", status: false }],
      });
    }

    //Response
    return res.status(200).json({
      user,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Edit User Profile
 * @route PUT /api/user/edit-profile
 * @access Private
 */
module.exports.editProfile = async (req, res) => {
  const { _id } = req.user;
  const { ...payload } = req.body;
  const data = { ...payload };

  //Preparing Input
  const input = {
    name: data.name,
    address: data.address,
    phoneNumber: data.phoneNumber,
    profession: data.profession,
    web: data.web,
    socials: [
      {
        instagram: data.instagram,
        linkedIn: data.linkedIn,
        twitter: data.twitter,
        facebook: data.facebook,
      },
    ],
  };

  //Logic
  try {
    await userModel.updateOne({ _id }, { ...input }, { new: true });

    //Response
    return res.status(200).json({
      msg: "Profile Updated Successfully",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Change Password
 * @route PUT /api/user/change-password
 * @access Private
 */
module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { _id } = req.user;

  if (currentPassword.length === 0) {
    return res.status(400).json({
      errors: [{ msg: "Password must be atleast 8 characters", status: false }],
    });
  }
  if (newPassword.length === 0) {
    return res.status(400).json({
      errors: [{ msg: "Password must be atleast 8 characters", status: false }],
    });
  }

  //Change Password Logic
  try {
    const user = await userModel.findOne({ _id }).select("+password");
    if (user) {
      const matched = await bcrypt.compare(currentPassword, user.password);
      if (matched) {
        //Preparing the hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        await userModel.updateOne({ _id }, { password: hash });
        return res
          .status(200)
          .json({ msg: "Password updated succesfully", status: true });
      } else {
        return res.status(400).json({
          errors: [{ msg: "Invalid Current Password", status: false }],
        });
      }
    } else {
      return res.status(400).json({
        errors: [{ msg: "User not found", status: false }],
      });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Delete User Account
 * @route DELETE /api/user/delete-account
 * @access Private
 */
module.exports.deleteAccount = async (req, res) => {
  const { _id } = req.user;
  try {
    await userModel.deleteOne({ _id });
    return res
      .status(200)
      .json({ msg: "Account deleted succesfully", status: true });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
