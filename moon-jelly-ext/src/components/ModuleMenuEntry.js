import React, { Component } from 'react'
import Button from './Button.js';

export default class ModuleMenuEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: false
        }
    }


    // Flips the state of the checkbox whenever it is clicked
    changeState() {
        let prevState = this.state.enabled;
        this.setState({
            enabled: !prevState
        });
        
    }

    render() {
        return (
            <div>
                <input type="checkbox" checked={this.state.enabled} onChange={()=>this.changeState()}/>  

                <Button
                    primary={this.props.selected == this.props.name} noRound    
                    onClick={this.props.setNextPanel.bind(this, this.props.name)}   
                >
                    {this.props.name}
                </Button>
            </div>
        );
    }
}