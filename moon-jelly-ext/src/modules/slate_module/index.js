// slate integration
import React, {useContext} from 'react';
import SlateFetch from './SlateFetch.js';
import Panel from '../../components/Panel.js';

const MODULE_NAME = "slate_module";

const slate_module = () => (
    <Panel>
        <SlateFetch />
    </Panel>
);

function slateOnAppStart() {
    // checks if a certain value is not null.
    // If that is the case, then there must be something to do. 
    // will reset this value to null in the module page so that this doesn't happen over and over
    let val = localStorage.getItem("slateToOcean");
    if(val != null && val !== "")
    {
        console.log("slateToOcean value: ", val);
        localStorage.setItem("switch_panel", MODULE_NAME);
    }
}

export default {
    title: "Slate", // (string) name to display in menus. If left blank, defaults to name
    name: MODULE_NAME, // (string) key of the module
    properties: { // container of various properties for code to reference
        hasPanel: true // (boolean) whether or not the module has a panel to display
    },
    panel: slate_module, // (function) react function to display as a panel
    onAppStart: slateOnAppStart // (function) function that gets called when the app starts
}