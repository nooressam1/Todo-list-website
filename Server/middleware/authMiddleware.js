const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization"); // Get the Authorization header
  if (!authHeader) return res.status(401).json({ message: "Access denied" });

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
  if (!token) return res.status(401).json({ message: "Access denied, no token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user data
    console.log("Token verified calling backend");
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    console.error("JWT verification failed:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
