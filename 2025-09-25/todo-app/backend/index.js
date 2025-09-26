const express = require("express")
const app = express()
const port = 3000
const todosRoutes = require("./routes/todos.routes")
const authRoutes = require("./routes/auth.routes")

cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/todos", todosRoutes)
app.use("/auth", authRoutes)
