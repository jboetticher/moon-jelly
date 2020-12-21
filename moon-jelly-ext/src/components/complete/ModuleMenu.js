import React, { Component } from 'react'
import Panel from '../Panel.js';
import modules from '../../modules';
import '../../styles/ModuleMenu.css';
import ModuleMenuEntry from '../ModuleMenuEntry.js';
import '../../styles/variables.css';

// exports once
const modulesObject = modules;

let ModuleMenu = props => {

    function renderModules() {
        var mods = [];

        // Loop through all the modules to create a button/toggle for each
        for (var i = 0; i < modulesObject.length; i++) {
            // create the element
            let currentModule =
                <ModuleMenuEntry {...modulesObject[i]} key={i} selected={props.selected} />;

            // Add the module button/toggle to the array
            mods.push(currentModule);
        }

        // Return array to display
        return mods;
    }

    return (
        <Panel>
            MoonJelly Modules
            {renderModules()}
        </Panel>
    );
}

export default ModuleMenu;