import React, {Component} from "react"
import FetchFlavors from "./components/FetchFlavors"
import AddFlavorPrompt from "./components/AddFlavorPrompt"

export default class App extends Component {
  render() {
    return (
      <>
        <FetchFlavors/>
        <AddFlavorPrompt/>
      </>
    )
  }
}
