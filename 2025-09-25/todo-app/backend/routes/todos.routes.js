const express = require("express")
const router = express.Router()
const todosController = require("../controllers/todos.controller")
const { body, validationResult } = require("express-validator")

const {
  todosRouteMiddleware,
  todosGetRouteMiddleware,
} = require("../middlewares/todos.middlewares")

router.use(todosRouteMiddleware)

// /cats/ Get endpoint level middleware
router.get("/", todosGetRouteMiddleware, todosController.read)
router.post(
  "/",
  body("name").trim().notEmpty().withMessage("Name is required"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
    next()
  },
  todosController.create,
)
router.put(
  "/:id",
  body("name").trim().notEmpty().withMessage("Name is required"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
    next()
  },
  todosController.update,
)
router.delete("/:id", todosController.delete)

router.get("/admin", todosController.readAll)
router.patch("/admin/toggle/:id", todosController.toggleDeleted)

module.exports = router
