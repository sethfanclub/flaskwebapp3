import React, {Component} from "react"
import DeleteFlavorBtn from "./DeleteFlavorBtn"


export default class FetchFlavors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            flavors: []
        }
    }

    async componentDidMount() {
        const response = await fetch("/api/flavors/all")
        const data = await response.json()
        this.setState({
            isLoaded: true,
            flavors: data
        })
    }


    render() {
        console.log("Rendering...")
        
        const {flavors, isLoaded} = this.state

        if (!isLoaded) {
            return <h1>Loading...</h1>
        }

        return (
            <ul>
                {flavors.map(flavor => (
                    <li key={flavor.id}>
                        <span>{flavor.name} </span>
                        <DeleteFlavorBtn flavorId={flavor.id}>-</DeleteFlavorBtn>
                    </li>
                ))}
            </ul>
        )
    }
}