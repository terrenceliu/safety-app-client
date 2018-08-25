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
        this.state = {
            socket: undefined,
            case_id: undefined,
            active: false
        };
        this.timeID = undefined;
    }
    
    initSocket() {
        var socket = openSocket("http://localhost:8000")

        this.registerSocket(socket);
        
        this.setState({
            socket: socket
        })
    }

    registerSocket(socket) {
        socket.on('client_type', function() {
            socket.emit('client_type', 'client');
        });
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            var position = new Promise((resolve, reject) => {
                // navigator.geolocation.getCurrentPosition(resolve, reject);
                navigator.geolocation.watchPosition(resolve, reject)
            })

            return position;
        } else {
            // TODO: Hanlde failed case
            return "";
        }
    }
    
    openRequest = () => {
        let active = this.state.active;
        let socket = this.state.socket;
        if (!active) {
            // Get current location
            var location = this.getCurrentLocation().then((position) => {
                    
                var packet = {
                    case_id: 0,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                console.log('Packet', packet);
                socket.emit('packet', packet);
            });
            console.log("Start logging", this.timeID);
        } else {
            console.log("Stop logging", this.timeID);
        }

        this.setState({
            active: !active
        });
    }

    componentDidMount() {
        this.initSocket();
    }
    
    render() {
        return (
            <div>
                <div>
                    <HelpButton
                        case_id={this.case_id} 
                        openRequest={this.openRequest}                
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(App);