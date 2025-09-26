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

  todo.push(newTodo)
  res.status(201).json(newTodo)
}

exports.read = (req, res) => {
  res.send(todo.filter(c => !c.deleted))
}

exports.update = (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const todo = todo.find(c => c.id === id && !c.deleted)

  if (!todo) {
    return res.status(404).json({ error: "todo not found" })
  }

  todo.name = name || todo.name
  todo.updatedAt = Date.now()

  res.json(todo)
}

exports.delete = (req, res) => {
  const { id } = req.params

  const todo = todo.find(c => c.id === id && !c.deleted)

  if (!todo) {
    return res.status(404).json({ error: "todo not found" })
  }

  todo.deleted = true
  todo.updatedAt = Date.now()

  res.json({ message: "todo deleted", todo })
}
