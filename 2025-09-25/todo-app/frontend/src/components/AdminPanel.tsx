// AdminPanel.tsx
import { useEffect, useState } from "react"

interface Todo {
  id: string
  name: string
  deleted: boolean
  createdAt: number
  updatedAt: number | null
}

export default function AdminPanel() {
  const [todos, setTodos] = useState<Todo[]>([])

  // Fetch all todos (including deleted)
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:3000/todos/admin")
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Toggle deleted status
  const toggleTodo = async (id: string) => {
    const res = await fetch(`http://localhost:3000/todos/admin/toggle/${id}`, {
      method: "PATCH",
    })
    const data = await res.json()
    setTodos(prev => prev.map(t => (t.id === id ? data.todo : t)))
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin TODO Panel</h1>
      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.deleted ? "Deleted" : "Active"}</td>
              <td>{new Date(todo.createdAt).toLocaleString()}</td>
              <td>
                {todo.updatedAt
                  ? new Date(todo.updatedAt).toLocaleString()
                  : "-"}
              </td>
              <td>
                <button onClick={() => toggleTodo(todo.id)}>
                  Toggle Deleted
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
