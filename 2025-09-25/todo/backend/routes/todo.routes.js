const express = require("express")
const router = express.Router()
const todoController = require("../controllers/todo.controller")
const { body, validationResult } = require("express-validator")

const {
  todoRouteMiddleware,
  todoGetRouteMiddleware,
} = require("../middlewares/todo.middlewares")

router.use(todoRouteMiddleware)

// /todo/ Get endpoint level middleware
router.get("/", todoGetRouteMiddleware, todoController.read)
router.post(
  "/",
  body("name").trim().notEmpty().withMessage("Name is required"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
    next()
  },
  todoController.create,
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
  todoController.update,
)
router.delete("/", todoController.delete)

module.exports = router
