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
      { id: user._id, email: user.email, name: user.name },
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
      path: "/",
    });

    return res.status(201).json({ msg: "User created successfully!", name: user.name });
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

function logout(req, res) {
  // logging out is basically just erasing the jwt -- if sent in httpOnly cookie, I only need to cancel the cookie
  res.cookie("token", "", {
    httpOnly: true,
    secure: false, // false for local dev
    sameSite: "lax",
    expires: new Date(0), // immediately expire
    path: "/",
  });

  return res.status(200).json({ msg: "Logged out successfully" });
}

// ============================================================================

async function login(req, res) {
  const { email, password } = req.body;

  // validation
  // check that email is valid email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Email must be a valid email" });
  }

  // check that email exists
  const user = await userModel.findOne({ email }); // findOne returns single doc or null if not found
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" }); // For security, it’s best to respond with a generic “Invalid credentials”
  }

  // check password
  const passwordGood = await bcrypt.compare(password, user.password);
  if (!passwordGood) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // log user in: sign token, send it w/ httpOnly cookie
  // create token
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
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
    path: "/",
  });

  // return 200
  return res.status(200).json({ msg: "Logged in successfully!", name: user.name });
}

// ============================================================================

module.exports = { createUser, checkToken, logout, login };
