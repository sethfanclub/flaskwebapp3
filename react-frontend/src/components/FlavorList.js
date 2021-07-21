import React, {Component} from "react"
import FlavorItem from "./FlavorItem"

export default class FlavorList extends Component {
    deleteFlavor = (flavorID) => {
        this.props.deleteFlavor(flavorID)
    }

    render() {
        return (
            <ul>
                {this.props.flavors.map((flavor) => (
                    <FlavorItem key={flavor.id} flavor={flavor.name} id={flavor.id} handleBtnClick={this.deleteFlavor}/>
                ))}
            </ul>
        )
    }
}