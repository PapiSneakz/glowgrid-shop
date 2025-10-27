// lib/auth.js
import jwt from "jsonwebtoken";

export function verifyAdmin(req, res) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
