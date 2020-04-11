import React, { Component } from 'react'
import Car from './Car'
import PropTypes from "prop-types"

class Garage extends Component {
    render() {
        return this.props.cars.map((car) => (
        <Car key={car.id} car={car} delCar={this.props.delCar} addR={this.props.addR} subR={this.props.subR} />
        ));
    }
}

Garage.propTypes = {
    cars: PropTypes.array.isRequired
}

export default Garage
