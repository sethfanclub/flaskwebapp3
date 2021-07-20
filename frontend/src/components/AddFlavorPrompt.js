import React, {Component} from "react"

export default class AddFlavorPrompt extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: -1
        }
    }

    async generateUID() {
        const response = await fetch("/api/flavors/all")
        const flavors = await response.json()
        const newUID = Math.max(...flavors.map(flavor => flavor.id)) + 1
        return newUID
    }

    async addFlavorToDatabase(event, name) {
        if (event.key !== "Enter") {
            return
        }
        const newUID = await this.generateUID()
        console.log(newUID)

        const requestBody = {
            name: name
        }

        fetch("/api/flavors/" + newUID, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(requestBody)
        }).then(_response => {
            this.setState({
                id: newUID
            })
            console.log("Added new flavor with id " + newUID)
        })
    }

    render() {
        return <input id="AddFlavorPrompt" type="text" placeholder="Type your new flavor and press Enter!"
        onKeyPress={(event) => this.addFlavorToDatabase(event, document.getElementById("AddFlavorPrompt").value)}/>
    }
}