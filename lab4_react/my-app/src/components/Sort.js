import React, { Component } from 'react'
import './sort.css'
import desc from './png/sort-down.png'
import asc from './png/sort-ascending.png'

export class Sort extends Component {
    render() {
        return (
            <div className="row">
                <p className="title">Sort cars by ratings</p>
                <input className="up" onClick={this.props.up}  type="image" src={desc} alt={"desc"}/>
                <input className="down" onClick={this.props.down} type="image" src={asc} alt={"asc"}/>
            </div>
        )
    }
}

export default Sort
