// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   try {
//     // Get token from headers
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ message: "Access Denied. No token provided." });
//     }

//     // Verify token
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.user = decoded; // user info from token (id, email)

//     next(); // go to next middleware/controller
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Token format: "Bearer <token>"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7, authHeader.length).trim()
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mySuperSecretKey");

    // Add user info to request
    req.user = decoded;

    next(); // pass control to next middleware/route
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
