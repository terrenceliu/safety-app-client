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

        // End point for receiving assigned case id
        socket.on("case id", (id) => {
            this.setState({
                case_id: id
            })
            console.log("[Socket] Assigned case id: ", id);
        })

        this.setState({
            socket: socket
        })
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            var position = new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
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
            this.timeID = setInterval(() => {
                // Get current location
                var location = this.getCurrentLocation().then((position) => {
                    var latlng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var res = {
                        case_id: 0,
                        latlng: latlng,
                    }
                    socket.emit('request', res)
                });
            }, 1000);
            console.log("Start Time ID", this.timeID);
        } else {
            console.log("Stop Time ID", this.timeID);
            clearInterval(this.timeID);
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
                    <TopAppBar />
                </div>
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