import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import List from './components/List/List';
import Login from './components/Login/Login';
class Routermenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/listing" component={List} />
                </Switch>

            </div >

        );
    }
}

export default Routermenu;