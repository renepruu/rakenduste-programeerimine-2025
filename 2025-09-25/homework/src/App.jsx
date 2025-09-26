import React from "react";
import PropDrilling from "./PropDrilling";
import Context from "./Context";

function App() {
  return (
    <div style={{ display: "flex", gap: "50px", fontSize: "50px" }}>
      <div>
        <h2>Prop Drilling</h2>
        <PropDrilling />
      </div>

      <div>
        <h2>Context API</h2>
        <Context />
      </div>
    </div>
  );
}

export default App;
