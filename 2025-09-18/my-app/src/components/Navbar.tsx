// src/components/Navbar.tsx
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/something">Something</Link>
      </nav>
    </header>
  )
}

export default Navbar
