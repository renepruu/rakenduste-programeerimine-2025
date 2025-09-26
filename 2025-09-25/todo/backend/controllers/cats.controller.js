const crypto = require("crypto")

function generateId() {
  return crypto.randomUUID()
}
const cats = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Meow",
    createdAt: 1727098800585,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Kitty",
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

  const newCat = {
    id: generateId(),
    name,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  }

  cats.push(newCat)
  res.status(201).json(newCat)
}

exports.read = (req, res) => {
  res.send(cats.filter(c => !c.deleted))
}

exports.update = (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const cat = cats.find(c => c.id === id && !c.deleted)

  if (!cat) {
    return res.status(404).json({ error: "Cat not found" })
  }

  cat.name = name || cat.name
  cat.updatedAt = Date.now()

  res.json(cat)
}

exports.delete = (req, res) => {
  const { id } = req.params

  const cat = cats.find(c => c.id === id && !c.deleted)

  if (!cat) {
    return res.status(404).json({ error: "Cat not found" })
  }

  cat.deleted = true
  cat.updatedAt = Date.now()

  res.json({ message: "Cat deleted", cat })
}
