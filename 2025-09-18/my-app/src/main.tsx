import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { HashRouter, Route, Routes } from "react-router-dom"
import About from "./pages/About.tsx"
import Something from "./pages/Something.tsx"
import Home from "./pages/Home.tsx"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#ff9800",
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  </React.StrictMode>,
)
