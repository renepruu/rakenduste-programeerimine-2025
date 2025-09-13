import { useState } from "react"
import "../App.css"

function Counter() {
  const [count, setCount] = useState(0)

  const steps = [100, 50, 25, 1, -1, -25, -50, -100]

  function increaseCounter(amount: number) {
    setCount(prev => prev + amount)
  }

  return (
    <>
      <h1>Vite + React + Rene</h1>
      <div className="card">
        <p>Count is {count}</p>
        <div className="buttons">
          {steps.map(step => (
            <button
              key={step}
              onClick={() => increaseCounter(step)}
            >
              {step}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Counter
