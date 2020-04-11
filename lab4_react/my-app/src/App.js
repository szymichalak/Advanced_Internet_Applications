import React, { Component } from 'react';
import Header from "./components/Header"
import Garage from "./components/Garage"
import Sort from './components/Sort';
import uuid from 'uuid'
import data from './data.json'
import Serach from './components/Serach';


class App extends Component {

  state = data

  delCar = (id) => {
    this.setState({ cars: [...this.state.cars.filter(car => car.id !== id)] })
  }

  addCar = (mark, model, rating, photo) => {
    if (rating < 1){
      rating = 1
    }
    else if (rating > 10){
      rating = 10
    }
    const newCar = {
      id: uuid.v4(),
      mark: mark,
      model: model,
      rating: rating,
      photo: photo
    }
    this.setState({ cars: [...this.state.cars, newCar] })
  }

  compare_asc = (a, b) => {
    const ratingA = a.rating
    const ratingB = b.rating

    let comparison = 0;
    if (ratingA > ratingB) {
      comparison = 1;
    } else if (ratingA < ratingB) {
      comparison = -1;
    }
    return comparison;
  }

  compare_desc = (a, b) => {
    const ratingA = a.rating
    const ratingB = b.rating

    let comparison = 0;
    if (ratingA > ratingB) {
      comparison = 1;
    } else if (ratingA < ratingB) {
      comparison = -1;
    }
    return comparison * (-1);
  }

  addR = (id) => {
    var cut = { cars: [...this.state.cars.filter(car => car.id === id)] }
    var selectedCar = cut.cars[0].rating + 1
    if (selectedCar >= 1 && selectedCar <= 10) {
      this.setState(prevState => {
        const cars_array = prevState.cars.map((car) => {
          if (car.id === id) {
            car.rating = selectedCar
          }
          return car
        })
        return { cars: cars_array }
      })
    }
  }

  subR = (id) => {
    var cut = { cars: [...this.state.cars.filter(car => car.id === id)] }
    var selectedCar = cut.cars[0].rating - 1
    if (selectedCar >= 1 && selectedCar <= 10) {
      this.setState(prevState => {
        const cars_array = prevState.cars.map((car) => {
          if (car.id === id) {
            car.rating = selectedCar
          }
          return car
        })
        return { cars: cars_array }
      })
    }
  }

  up = () => {
    const myData = [].concat(this.state.cars).sort(this.compare_asc)
    this.setState({ cars: myData })
  }

  down = () => {
    const myData = [].concat(this.state.cars).sort(this.compare_desc)
    this.setState({ cars: myData })
  }

  search = (mark) => {
    this.setState({ 
      cars: [...this.state.cars
        .filter(car => car.mark.startsWith(mark) || car.model.startsWith(mark))] 
    })
  }

  render() {
    return (
      <div className="App">
        <Header addCar={this.addCar} />
        <Serach search={this.search} />
        <Sort up={this.up} down={this.down} />
        <Garage cars={this.state.cars} delCar={this.delCar} addR={this.addR} subR={this.subR} />
      </div>
    );
  }

}

export default App;
