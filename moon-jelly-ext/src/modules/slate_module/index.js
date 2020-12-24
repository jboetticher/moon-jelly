// slate integration
import React, {useContext} from 'react';
import SlateFetch from './SlateFetch.js';
import Panel from '../../components/Panel.js';
import {PanelContext} from '../../App.js';

const MODULE_NAME = "slate_module";

const slate_module = () => (
    <Panel>
        <SlateFetch />
    </Panel>
);

function slateOnAppStart() {
    let val = localStorage.getItem("slateToOcean");
    if(val != null && val !== "")
    {
        console.log("slateToOcean value: ", val);
        localStorage.setItem("switch_panel", MODULE_NAME);
    }
}

export default {
    title: "Slate",
    name: MODULE_NAME,
    properties: {
        hasPanel: true
    },
    panel: slate_module,
    onAppStart: slateOnAppStart
}