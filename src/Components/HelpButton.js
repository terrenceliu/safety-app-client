import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';


// Styles

const styles = (props) => {

};

class HelpButton extends Component {
    constructor() {
        super();
        this.state = {
            active: false
        }
        this.timeID = undefined;
        
    }
    
    openRequest = (socket) => {
        let active = this.state.active;
        if (!active) {
            this.timeID = setInterval(function() {
                socket.emit('request', 'hello, world');
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
    
    render() {
        const { classes } = this.props;

        const { socket } = this.props;

        return (
            <Button 
                variant="fab" 
                color="primary" 
                aria-label="add"
                onClick={() => this.openRequest(socket)}>
                <AddIcon />
            </Button>
        );
    }
}

HelpButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HelpButton);