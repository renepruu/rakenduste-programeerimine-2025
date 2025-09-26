const express = require("express")
const router = express.Router()
const catsController = require("../controllers/cats.controller")
const { body, validationResult } = require("express-validator")

const {
  catsRouteMiddleware,
  catsGetRouteMiddleware,
} = require("../middlewares/cats.middlewares")

router.use(catsRouteMiddleware)

// /cats/ Get endpoint level middleware
router.get("/", catsGetRouteMiddleware, catsController.read)
router.post(
  "/",
  body("name").trim().notEmpty().withMessage("Name is required"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
    next()
  },
  catsController.create,
)
router.put(
  "/",
  body("id").trim().notEmpty().withMessage("ID is required"),
  body("name").trim().notEmpty().withMessage("Name is required"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
    next()
  },
  catsController.update,
)
router.delete("/", catsController.delete)

module.exports = router
