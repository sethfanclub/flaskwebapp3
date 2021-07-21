import React, {Component} from "react"
import FlavorList from "./components/FlavorList"
import FlavorForm from "./components/FlavorForm"


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flavors: [],
      isLoaded: false
    }
  }

  async fetchFlavorsFromAPI() {
    const response = await fetch("/api/flavors/all")
    const flavors = await response.json()
    this.setState({
      flavors: flavors,
      isLoaded: true
    })
  }

  addFlavor = flavorName => {
    const newFlavor = {
      id: this.state.flavors.length,
      name: flavorName
    }

    this.setState(prevState => ({
      flavors: [...prevState.flavors, newFlavor]
    }))

    fetch("/api/flavors/" + newFlavor.id, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: flavorName})
    })
  } 

  deleteFlavor = flavorID => {
    this.setState(prevState => ({
      flavors: prevState.flavors.filter(flavor => flavor.id !== flavorID)
    }))

    fetch("/api/flavors/" + flavorID, {
      method: "DELETE"
    })
  }
  
  render() {
    if (!this.state.flavors.length) {
      this.fetchFlavorsFromAPI()
    }

    if (!this.state.isLoaded) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="App">
        <h1>Flavors</h1>
        <FlavorList flavors={this.state.flavors} deleteFlavor={this.deleteFlavor} />
        <FlavorForm addFlavor={this.addFlavor}/>
      </div>
    )
  }
}
