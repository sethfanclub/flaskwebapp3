import React, {Component} from "react"

export default class FlavorItem extends Component {
    handleClick = () => {
        this.props.handleBtnClick(this.props.id)
    }

    render() {
        return (
            <li>
                {this.props.flavor} 
                <button onClick={this.handleClick}>-</button>
            </li>
        )
    }
}