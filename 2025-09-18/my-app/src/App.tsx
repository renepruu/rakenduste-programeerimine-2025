import { useState } from "react"
import Button from "@mui/material/Button"
import "./App.css"
import Navbar from "./components/Navbar"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <h1>App</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <div>
          <Button variant="outlined">MUI nupp</Button>
        </div>
      </div>
    </>
  )
}

export default App
