// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");   // jo tumne banaya hai
// const auth = require("../middlewares/auth");
// const router = express.Router();

// // ✅ SECRET KEY (best: env file me rakho)
// const secretKey = process.env.JWT_SECRET || "mySuperSecretKey";

// // ✅ Signup
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // save new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("❌ Signup Error:", error.message);
//     res.status(500).json({ message: "Error in signup", error: error.message });
//   }
// });

// // ✅ Login
// router.post("/login", async (req, res) => {
//   try {
//     console.log("📩 Login Request Body:", req.body);  // debugging

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // Create token
//     const token = jwt.sign(
//       { id: user._id, name: user.name, email: user.email },
//       process.env.JWT_SECRET || "mySuperSecretKey",
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (err) {
//     console.error("❌ Login Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Protected Profile Route
// router.get("/profile", auth, (req, res) => {
//   res.json({
//     message: "Welcome to your profile!",
//     user: req.user // token payload (id, name, email)
//   });
// });

// // ✅ Logout (for JWT, client side pe token delete karna hota hai)
// router.post("/logout", (req, res) => {
//   res.json({ message: "Logged out successfully" });
// });

// module.exports = router;


const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
const auth = require("../middlewares/auth"); 
const router = express.Router();

const secretKey = process.env.JWT_SECRET || "mySuperSecretKey";

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ message: "Error in signup", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "7d" }
    );

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Protected profile
router.get("/profile", auth, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

// Logout (client deletes token)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
