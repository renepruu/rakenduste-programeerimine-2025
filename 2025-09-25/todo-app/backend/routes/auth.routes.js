const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const JWT_SECRET = "saladus"

const user = {
  username: "admin",
  password: "1234", // ainult näide, mitte turvaline!
  role: "admin",
}

// POST /auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body

  if (username !== user.username || password !== user.password) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  // Koostame JWT, salvestame username ja role
  const token = jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" },
  )

  res.json({ token })
})

// GET /auth/ping
router.get("/ping", (req, res) => {
  const authHeader = req.headers["authorization"]
  if (!authHeader) return res.status(401).json({ error: "No token provided" })

  const token = authHeader.split(" ")[1] // Bearer <token>
  if (!token) return res.status(401).json({ error: "No token provided" })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    res.json({ message: "JWT valid", user: decoded })
  } catch (err) {
    res.status(401).json({ error: "Invalid token" })
  }
})

module.exports = router
