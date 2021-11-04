import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';


import Header from '../Header/header';

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Header/>
            </Router>
        )
    }
}