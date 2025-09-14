import React, { useState } from "react"

function Dice() {
  const [dice, setDice] = useState<number>(1)

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    setDice(randomNumber)
  }

  return (
    <div>
      <h2>Dice Roller</h2>
      <p>You rolled a {dice}</p>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  )
}

export default Dice
