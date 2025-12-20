const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================================================================

async function createUser(req, res) {
  // get form data
  const { email, password, passwordConfirm } = req.body;

  // validate: email must be valid email, and  unique -- handled by Mongoose model validators -- caught here by try-catch
  // validate: passwords must match
  if (password !== passwordConfirm) {
    return res.status(400).json({ msg: `Passwords don't match.` });
  }
  if (password.trim().length < 6) {
    return res.status(400).json({ msg: `Password is not long enough.` });
  }

  try {
    // all good -- create user but hash pw beforehand
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
    const user = await userModel.create({
      name: email.split("@")[0].trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    // return user (token) to FE -- UI: show task form & user's tasks, hide auth forms
    // create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1d" } // token lifetime
    );
    // send token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // expires in 1 day
    });

    return res.status(201).json({ msg: "User created successfully!" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}

// ============================================================================

async function checkToken(req, res) {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
}

// ============================================================================

module.exports = { createUser, checkToken };
