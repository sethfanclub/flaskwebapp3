import React from "react"

function App() {
  fetch("/api/flavors/all")
    .then(response => response.json())
    .then(data => console.log(data))
  return <h1 align="center">Hey</h1>
}

export default App;
