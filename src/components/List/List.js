import React, { Component } from "react";
import './List.css';
import Header from '../Header/Header';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            searchPlanets: []
        };
    }

    getPlanetList = () => {
        const API_URL = 'http://localhost:3000/planet.json';
        fetch(API_URL).then(response => response.json())
            .then((res) => this.setState({ planets: res.results }))
    }

    componentDidMount() {
        this.getPlanetList()
    }

    filterPlanetData = (e) => {
        if (e.target.value === '') {
            console.log('first')
            this.getPlanetList()
        } else {
            
            var filteredPlanetData = this.state.planets.filter(function (el) {
                return el.name.toLowerCase() === e.target.value.toLowerCase();
            });
            console.log('this.state.filteredPlanetData', filteredPlanetData);
            this.setState({ searchPlanets: filteredPlanetData })
        }
        console.log('e.target.value', e.target.value);

    }
    // function fetchPlanetData() {
    //     alert('Hello!');
    // }

    render() {
        console.log('this.state.planets', this.state.planets);
        const { planets = [] } = this.state;
        return (
            <div className="limiter" >
                <Header />
                <div className="container-table100">
                    <input type="text"
                        onChange={this.filterPlanetData}
                    />
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">
                            <div className="table100-body ">
                                <table>
                                    <tbody>
                                        <tr className="row100 head">
                                            <th className="cell100 column1">Name</th>
                                            <th className="cell100 column2">Climate</th>
                                            <th className="cell100 column3">Orbital Period</th>
                                            <th className="cell100 column4">Terrain</th>
                                            <th className="cell100 column5">Population</th>
                                            <th className="cell100 column6">Surface Water</th>
                                        </tr>

                                        {planets.map((planet, index) => (
                                            <tr className="row100 body" key={index}>
                                                <td className="cell100 column1">{planet.name}</td>
                                                <td className="cell100 column2">{planet.climate}</td>
                                                <td className="cell100 column3">{planet.orbital_period}</td>
                                                <td className="cell100 column4">{planet.terrain}</td>
                                                <td className="cell100 column5">{planet.population}</td>
                                                <td className="cell100 column6">{planet.surface_water}</td>
                                            </tr>
                                        ))}
                                        <tr className="row100 body">
                                            <td><button >Prev</button></td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td>Next</td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;