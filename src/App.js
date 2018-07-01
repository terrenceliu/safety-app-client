import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// SocketIO
import openSocket from 'socket.io-client';

// Components

import HelpButton from './Components/HelpButton';
import TopAppBar from './Components/AppBar';

// UI

const styles = (props) => {
    
}

class App extends Component {
    constructor() {
        super();
        this.socket = openSocket("http://localhost:8000");
    }

    initSocket() {
        // End point for receiving assigned case id
        this.socket.on("case id", function(id) {
            console.log("[Socket] Assigned case id: ", id);
        })
    }

    componentDidMount() {
        this.initSocket();
    }

    render() {
        return (
            <div>
                <div>
                    <TopAppBar />
                </div>
                <div>
                    <HelpButton 
                        socket={this.socket}                
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(App);