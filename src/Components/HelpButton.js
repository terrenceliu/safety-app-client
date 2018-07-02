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
        
    }

   
    
    render() {
        const { classes } = this.props;

        return (
            <Button 
                variant="fab" 
                color="primary" 
                aria-label="add"
                onClick={this.props.openRequest}>
                <AddIcon />
            </Button>
        );
    }
}

HelpButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HelpButton);