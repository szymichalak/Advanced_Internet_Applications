import React, { Component } from 'react'
import search_png from './png/search.png'
import './search.css'

export class Serach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }

        this.myChangeHandler = this.myChangeHandler.bind(this) 
    }

    myChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="search_div">
                <input
                    type="text"
                    onChange={this.myChangeHandler}
                    className="search_input"
                    value={this.state.text}
                    name="text"
                    placeholder="Search for mark or model..."
                />
                <input 
                    className="search_btn" 
                    onClick={this.props.search.bind(this, this.state.text)}  
                    type="image" 
                    src={search_png} 
                    alt={"close"}
                />
            </div>
        )
    }
}

export default Serach
