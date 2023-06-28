const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  const token = authHeader.substring(7); // Remove "Bearer " from the beginning of the header
  try {
    const decoded = jwt.verify(token, "piyushisverycool");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token, More Details: " + err });
  }
};
