let todos = []

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}

exports.create = (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: "Name is required" })
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
  res.json(todos.filter(t => !t.deleted))
}

exports.update = (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const todoItem = todos.find(t => t.id === id && !t.deleted)

  if (!todoItem) {
    return res.status(404).json({ error: "Todo not found" })
  }

  todoItem.name = name || todoItem.name
  todoItem.updatedAt = Date.now()

  res.json(todoItem)
}

exports.delete = (req, res) => {
  const { id } = req.params

  const todoItem = todos.find(t => t.id === id && !t.deleted)

  if (!todoItem) {
    return res.status(404).json({ error: "Todo not found" })
  }

  todoItem.deleted = true
  todoItem.updatedAt = Date.now()

  res.json({ message: "Todo deleted", todo: todoItem })
}
