import React, { Component } from 'react'
//import Button from '../Button.js';
import modules from '../../modules';
import '../../styles/ModuleMenu.css';
import ModuleMenuEntry from '../ModuleMenuEntry.js';

// exports once
const modulesObject = modules;

let ModuleMenu = props => {

    function renderModules() {
        var mods = [];

        // Loop through all the modules to create a button/toggle for each
        for (var i = 0; i < modulesObject.length; i++) {
            // create the element
            let currentModule =
                <ModuleMenuEntry name={modulesObject[i].name} key={i} selected = {props.selected} />;

            // Add the module button/toggle to the array
            mods.push(currentModule);
        }

        // Return array to display
        return mods;
    }

    return (
        <div className="grid-container">
            {renderModules()}
        </div>
    );    
}

export default ModuleMenu;

/*
export default class ModuleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderModules() {
        var mods = [];

        // Loop through all the modules to create a button/toggle for each
        for (var i = 0; i < modulesObject.length; i++) {
            // create the element
            let currentModule =
                <ModuleMenuEntry name={modulesObject[i].name} key={i} selected = {this.props.selected} setNextPanel = {this.props.setNextPanel} />;

            // Add the module button/toggle to the array
            mods.push(currentModule);
        }

        // Return array to display
        return mods;
    }

    render() {
        return (
            <div className="grid-container">
                {this.renderModules()}
            </div>
        );
    }
}*/