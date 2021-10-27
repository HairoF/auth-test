import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';


import Header from '../Header/header';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Router>
                <Header/>
            </Router>
        )
    }
}