import React, { Component } from 'react'
import del from './png/trash.png'
import minus from './png/minus.png'
import plus from './png/plus2.png'
import './car.css'


class Car extends Component {

    render() {
        const { id } = this.props.car
        return (
            <div className="singleCar">
                <p className="mark">{this.props.car.mark}</p>
                <p className="model">{this.props.car.model}</p>
                <div className="rating">
                    <input className="addRating" onClick={this.props.addR.bind(this, id)} type="image" src={plus} alt={"plus"} />
                    <p className="rating_num">{this.props.car.rating}</p>
                    <input className="subRating" onClick={this.props.subR.bind(this, id)} type="image" src={minus} alt={"minus"} />
                </div>
                <img className="photo" src={this.props.car.photo} alt="car_photo"></img>
                <input className="deleteElement" onClick={this.props.delCar.bind(this, id)} type="image" src={del} alt={"delete"} />
            </div>
        )
    }
}


export default Car
