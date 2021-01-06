import React, {useContext} from 'react';
import Panel from '../../components/Panel.js';
import OneInchPanel from './OneInchPanel.js';

const MODULE_NAME = "oneInch_module";

const oneInch_module = () => (
    <Panel>
        <OneInchPanel/>
    </Panel>
);

function oneInchOnAppStart() {
    console.log("1inch integration baby");
}

export default {
    title: "1inch Exchange", // (string) name to display in menus. If left blank, defaults to name
    name: MODULE_NAME, // (string) key of the module
    properties: { // container of various properties for code to reference
        hasPanel: true // (boolean) whether or not the module has a panel to display
    },
    panel: oneInch_module, // (function) react function to display as a panel
    onAppStart: oneInchOnAppStart // (function) function that gets called when the app starts
}