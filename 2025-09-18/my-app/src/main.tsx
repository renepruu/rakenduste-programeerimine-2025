import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { HashRouter, Route, Routes } from "react-router-dom"
import About from "./pages/About.tsx"
import Something from "./pages/Something.tsx"
import Home from "./pages/Home.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/something"
          element={<Something />}
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
