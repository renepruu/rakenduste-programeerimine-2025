const crypto = require("crypto")

function generateId() {
  return crypto.randomUUID()
}
const todos = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Homework",
    createdAt: 1727098800585,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Shopping",
    createdAt: 1727098952739,
    updatedAt: null,
    deleted: false,
  },
]
exports.create = (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400)
  }

  const newTodo = {
    id: generateId(),
    name,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  }

  todos.push(newTodo)
  res.status(201).json(newTodo)
}

exports.read = (req, res) => {
  res.send(todos.filter(t => !t.deleted))
}

exports.update = (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const todo = todos.find(t => t.id === id && !t.deleted)

  if (!todo) {
    return res.status(404).json({ error: "TODO not found" })
  }

  todo.name = name || todo.name
  todo.updatedAt = Date.now()

  res.json(todo)
}

exports.delete = (req, res) => {
  const { id } = req.params

  const todo = todos.find(t => t.id === id && !t.deleted)

  if (!todo) {
    return res.status(404).json({ error: "TODO not found" })
  }

  todo.deleted = true
  todo.updatedAt = Date.now()

  res.json({ message: "TODO deleted", todo })
}
