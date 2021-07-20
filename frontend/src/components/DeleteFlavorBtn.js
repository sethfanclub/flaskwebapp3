import React, {Component} from "react"

export default class DeleteFlavorBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deleted: false
        }
    }

    removeFlavorFromDatabase(flavorId) {
        fetch("/api/flavors/" + flavorId, {
            method: "DELETE" 
        }).then(_response => {
            this.setState({
                deleted: true
            })
            console.log("Deleted element with id " + flavorId)
        }) 
    }

    render() {
        return <button onClick={() => this.removeFlavorFromDatabase(this.props.flavorId)}>{this.props.children}</button>
    }
}