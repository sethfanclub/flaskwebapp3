import React, {Component} from "react"

export default class FlavorForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flavorInput: ""
        }
    }
    
    handleChange = event => this.setState({
        flavorInput: event.target.value
    })

    handleSubmit = event => {
        event.preventDefault()
        this.props.addFlavor(this.state.flavorInput)
        this.setState({
            flavorInput: ""
        })
    } 

    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <input type="text"
                 placeholder="Add flavor..."
                 value={this.state.flavorInput}
                 onChange={event => this.handleChange(event)}
                />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}