import React, { Component } from 'react';
import modules from '../modules';

import Panel from '../components/Panel';

// exports once
const modulesObject = modules;
console.log(modulesObject);

function GetPanel(panelName) {
    return (
    <Panel>
        {modulesObject[1].panel()}
    </Panel>
    );
}

function HasPanel(panelName) {
    for(var i = 0; i < modulesObject.length; i++) {

        const sameName = modulesObject[i].name === panelName;
        const panelIncluded = modulesObject[i].properties != null && modulesObject[i].properties.hasPanel === true;

        if(sameName && panelIncluded) {
            return true;
        }
    }

    return false;
}

export { GetPanel, HasPanel};