import React, { Component } from 'react'
import Button from './Button.js';
import modules from '../modules';
import '../styles/ModuleMenu.css';

// exports once
const modulesObject = modules;

export default class ModuleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderModules(){
        var mods = [];

        // Loop through all the modules to create a button/toggle for each
        for(var i = 0; i < modulesObject.length; i++) {
            // create the element
            let currentModule = 
                <Button
                    primary={this.props.selected == modulesObject[i].name} noRound
                    onClick={this.props.setNextPanel.bind(this, modulesObject[i].name)}
                >
                    {modulesObject[i].name}
                </Button>;

            // Add the module button/toggle to the array
            mods.push(currentModule);
        }

        // Return array to display
        return mods;
    }

    render(){
        return (
            <div className="grid-container">
                {this.renderModules()}
            </div> 
        );
    }
}