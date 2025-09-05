const mailSender = require('../utils/mailSender');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.postRegister = async (req, res) => {
  const { email, linkedin, password1, password2, accountType } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: email });

    // Password validation
    if (password1 !== password2) {
      return res.status(400).json({
        success: false,
        message: "Passwords don't match!",
      });
    }

    if (password1.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password is too short. Minimum 8 characters required.",
      });
    }

    if (userExists && userExists.verified === true) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists!",
      });
    }


    // Create new user
    const hashedPass = await bcrypt.hash(password1, 10);
    const token = crypto.randomBytes(32).toString("hex");
    const photo = "client.jpg"; // Default profile pic
    if (userExists && userExists.verified === false) {
      const alreadyuseremail = `https://devlance-veiu.onrender.com/user/verify/${userExists.verification_token}`
      await mailSender(
        email,
        "Verification Email",
        `<h1>Please verify your account</h1>
             <p>Click the link below to verify your email:</p>
             <a href="${alreadyuseremail}">${alreadyuseremail}</a>`
      );
      return res.status(200).json({
        success: true,
        message: "User Already exist but we send you verification email again verified your account!",
      });
    }

    await User.create({
      email: email,
      linkedin: linkedin,
      password: hashedPass,
      accountType: accountType,
      verification_token: token,
      photo: photo,
    });

    const verification_link = `https://devlance-veiu.onrender.com/user/verify/${token}`;

    // Send verification email

    await mailSender(
      email,
      "Verification Email",
      `<h1>Please verify your account</h1>
             <p>Click the link below to verify your email:</p>
             <a href="${verification_link}">${verification_link}</a>`
    );

    // Send response to frontend
    return res.status(200).json({
      success: true,
      message: "Email Sent! Please verify your account to log in.",
    });

  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during registration. Please try again later.",
    });
  }
};


exports.verifyToken = async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification link.",
      });
    }

    const user = await User.findOneAndUpdate(
      { verification_token: token },
      {
        $set: {
          verified: true,
          // verification_token: null,
        },
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification token.",
      });
    }
    return res.redirect("https://devlance-saas.vercel.app/login");

    // return res.status(200).json({
    //   success: true,
    //   message: "Account Verified! You can log in now.",
    //   redirect: "/login",
    // });

  } catch (e) {
    console.error("Verification error:", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying your account.",
    });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email only (never password in $or)
    const current_user = await User.findOne({ email });

    if (!current_user) {
      return res.status(404).json({
        success: false,
        message: "Account doesn't exist! Check entered credentials.",
      });
    }

    if (!current_user.verified) {
      return res.status(401).json({
        success: false,
        message: "Account not verified! Please verify your email before login.",
      });
    }

    const passCheck = await bcrypt.compare(password, current_user.password);

    if (!passCheck) {
      return res.status(401).json({
        success: false,
        message: "Invalid password!",
      });
    }

    // Password correct, create token
    const token = jwt.sign(
      { _id: current_user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "none",
    });


    // Send redirect route depending on user type
    if (current_user.accountType === "Client") {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        redirect: "/posts",
      });
    } else {
      if (current_user.github_verified) {
        return res.status(200).json({
          success: true,
          message: "Login successful",
          redirect: "/posts",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "GitHub verification required",
          redirect: "/dev/verify",
        });
      }
    }
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({
      success: false,
      message: "Server error! Please try again later.",
    });
  }
};


exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now() - 1),
    // secure: process.env.NODE_ENV === 'production'
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};