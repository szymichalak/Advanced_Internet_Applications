import React, { Component } from 'react'
import './popup.css';
import close_popup from './png/close.png'


class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: "",
            model: "",
            rating: "",
            photo: ""
        }

        this.myChangeHandler = this.myChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)    
    }



    myChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addCar(this.state.mark, this.state.model, this.state.rating, this.state.photo)
        this.setState({
            mark: "",
            model: "",
            rating: "",
            photo: ""
        })
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <form onSubmit={this.onSubmit}>
                        <p className="popup_title">Add a car to your garage</p>

                        <input
                            type="text"
                            onChange={this.myChangeHandler}
                            value={this.state.mark}
                            name="mark"
                            placeholder="   Enter mark"
                            className="entry"
                        />
                        <br></br>
                        <input
                            type="text"
                            onChange={this.myChangeHandler}
                            value={this.state.model}
                            name="model"
                            placeholder="   Enter model"
                            className="entry"
                        />
                        <br></br>
                        <input
                            type="number"
                            onChange={this.myChangeHandler}
                            value={this.state.rating}
                            name="rating"
                            placeholder="   Enter rating"
                            className="entry"
                        />
                        <br></br>
                        <input
                            type="text"
                            onChange={this.myChangeHandler}
                            value={this.state.photo}
                            name="photo"
                            placeholder="   Enter photo's URL"
                            className="entry"
                        />

                        <br></br>
                        <input type="submit" value="Submit" />
                    </form>
                    <input className="close_popup" onClick={this.props.closePopup} type="image" src={close_popup} alt={"close"}/>
                </div>
            </div>
        );
    }
}

export default Popup;
