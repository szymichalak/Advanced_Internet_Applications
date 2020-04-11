import React, { Component } from 'react'
import Popup from './Popup';
import add from './png/plus.png'
import './header.css'


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { showPopup: false };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <div className="header">
                <p>My Garage list</p>
                <input className="addElement" onClick={this.togglePopup.bind(this)} type="image" src={add} alt={"add"}/>

                {this.state.showPopup ?
                    <Popup
                        // text='Click "Close Button" to hide popup'
                        closePopup={this.togglePopup.bind(this)}
                        addCar = {this.props.addCar}
                    />
                    : null
                }
            </div>
        )
    }
}

export default Header
